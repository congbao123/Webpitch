const User = require('../models/User');
const jwt = require('jsonwebtoken');

class MiddlewareController {

    verifyToken(req, res, next) {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token không hợp lệ");
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(403).json("you'r not authenticated");
        }
    }
   async checkAuth(req, res, next) {
    const userId = req.session.userId; // Lấy userId từ session
    if (userId) {
        try {
            const user = await User.findById(userId);
            if (user) {
                req.user = user; // Lưu thông tin người dùng vào request để sử dụng trong các route
                next();
            } else {
                res.status(401).json("User không tồn tại");
            }
        } catch (err) {
            console.error(err);
            res.status(500).json("Internal Server Error");
        }
    } else {
        res.status(401).json("Bạn chưa đăng nhập");
    }
}


    verifyTokenAdminAuth = (req, res, next) => {
        this.verifyToken(req, res, () => {
            if (req.user.id == req.params.id || req.user.admin) {
                next();
            } else {
                return res.status(403).json("Bạn không được phép xóa người khác");
            }
        });
    }

}
module.exports = new MiddlewareController();
