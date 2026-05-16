# 🎬 MovieTicketApp - Ứng dụng đặt vé xem phim trên nền tảng di động

## 📝 Giới thiệu hệ thống
MovieTicketApp là một ứng dụng di động đặt vé xem phim hiện đại, mang lại trải nghiệm mượt mà và đậm chất điện ảnh cho người dùng thông qua ngôn ngữ thiết kế Dark Mode. 

Hệ thống kết nối trực tiếp với nguồn dữ liệu phim quốc tế **TMDB API** để cập nhật liên tục các bộ phim đang chiếu. Điểm sáng của ứng dụng là tích hợp giải pháp kỹ thuật mô phỏng **sơ đồ ghế ngồi phối cảnh 3D trực quan**, cơ chế **đồng bộ trạng thái ghế ngồi theo thời gian thực** (Real-time synchronization) giúp tránh trùng lặp ghế, và tự động xuất **vé điện tử kèm mã QR Code** để đối soát giao dịch một cách bảo mật và nhanh chóng.

---

## 👥 Danh sách thành viên & Phân công nhiệm vụ

| STT | Họ và Tên | MSSV | Vai trò | Phân công nhiệm vụ cụ thể |
| 1 | Nguyễn Đình Bình An | [23810310363] [làm sản phẩm]
| 2 | Nguyễn Trường Gianng | [23810310374] [làm báo cáo]

---

## 🛠 Công nghệ sử dụng

Ứng dụng được xây dựng dựa trên hệ sinh thái công nghệ tối ưu cho di động và xử lý dữ liệu đám mây:

* **Frontend Framework:** React Native (Expo Workflow)
* **Ngôn ngữ lập trình:** JavaScript (ES6+)
* **Quản lý luồng điều hướng:** React Navigation (Stack Navigation)
* **Cơ sở dữ liệu & Xác thực:** Google Firebase (Cloud Firestore & Firebase Authentication)
* **Kết nối API dữ liệu phim:** Axios (kết nối với The Movie Database - TMDB API)
* **Thư viện bổ trợ:** `react-native-qrcode-svg` (Tạo mã QR), Lucide React Native / Expo Vector Icons (Hệ thống Icon)

---

## 🚀 Hướng dẫn cài đặt

Để cài đặt và thiết lập môi trường chạy project dưới môi trường Local, hãy làm theo các bước sau:

### 1. Yêu cầu tiên quyết
* Đã cài đặt Node.js (Phiên bản LTS khuyến nghị).
* Đã cài đặt điện thoại cài sẵn app Expo go (iOS/Android) hoặc trình giả lập (Simulator/Emulator).

### 2. Các bước cài đặt
Bật Terminal tại thư mục bạn muốn lưu project và chạy các lệnh sau:

# Di chuyển vào thư mục dự án
cd MovieTicketApp

# Cài đặt các gói thư viện phụ thuộc
npm install
# Chạy app
npx expo start

# Bạn có thể sử dụng tài khoản thử nghiệm dưới đây để đăng nhập thẳng vào hệ thống mà không cần qua bước đăng ký:

Email tài khoản: admin@gmail.com

Mật khẩu: 123456

# Một số hình ảnh minh họa hệ thống 

