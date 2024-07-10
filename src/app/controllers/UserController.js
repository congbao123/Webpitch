const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

let refreshTokens = [];

class UserController {
    // GET Register
    Register = (req, res, next) => {
        res.render('./auth/register');
    }

    // POST registerUser
    registerUser = async (req, res, next) => {
        try {
            // Kiểm tra xem email đã tồn tại chưa
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email đã được sử dụng' });
            }

            // Tạo salt và mã hóa mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Tạo người dùng mới
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });

            // Lưu người dùng mới vào cơ sở dữ liệu
            await newUser.save();
            res.status(200).redirect('auth/Login'); // Chuyển hướng sau khi đăng ký thành công
        } 
        catch (err) {
            console.error(err); // Ghi lại lỗi để kiểm tra
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // ACCESS TOKEN
    generateAccesstoken = (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "60s" }
        );
    }

    // REFRESH TOKEN
    generateRefreshToken = (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "360d" }
        );
    }
 //Get LOGIN
 Login = (req, res, next) => {
    res.render('./auth/Login');
}
    // POST LOGIN
        loginUser = async (req, res) => {
            try {
                const user = await User.findOne({ email: req.body.email });
                if (!user) {
                    return res.status(404).json("wrong email!");
                }
                const valiPassword = await bcrypt.compare(
                    req.body.password,
                    user.password
                );
                if (!valiPassword) {
                    return res.status(404).json('wrong password');
                }
                if (user && valiPassword) {
                    const accessToken = this.generateAccesstoken(user);
                    const newRefreshToken = this.generateRefreshToken(user);
                    refreshTokens.push(newRefreshToken);
                    res.cookie("refreshToken", newRefreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: "/",
                        sameSite: "strict",
                    });

                    const { password, ...others } = user._doc;

                    // res.status(200).json({ ...others, accessToken });
                    req.session.user = others; // Lưu thông tin người dùng vào session
                    res.redirect('/'); // Chuyển hướng đến trang chủ sau khi đăng nhập thành công        
                }
            } catch (err) {
                console.error(err); // Ghi lại lỗi để kiểm tra
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }

    // REQUEST REFRESH TOKEN
    requesRefreshToken = async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("you're not authenticated");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid");
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(403).json("Invalid refresh token");
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            // create new access token
            const newAccessToken = this.generateAccesstoken(user);
            const newRefreshToken = this.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({ accessToken: newAccessToken });
        });
    }
    userLoguot = async (req, res) => {
        try {
            res.clearCookie("refreshToken");
            refreshTokens = refreshTokens.filter(
                (token) => token !== req.cookies.refreshToken
            );
            
            req.session.destroy();
            res.clearCookie("refreshToken");
            res.redirect('/');
        } catch (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
}

module.exports = new UserController();
