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

## Di chuyển vào thư mục dự án
cd MovieTicketApp

## Cài đặt các gói thư viện phụ thuộc
npm install
## Chạy app
npx expo start

## Bạn có thể sử dụng tài khoản thử nghiệm dưới đây để đăng nhập thẳng vào hệ thống mà không cần qua bước đăng ký:

Email tài khoản: admin@gmail.com

Mật khẩu: 123456

# Một số hình ảnh minh họa hệ thống 
### Giao diện đăng ký 
<img width="350" height="650" alt="dangky" src="https://github.com/user-attachments/assets/e50df967-4ada-44a5-bf69-f67e1c726b89" />
###
### Giao diện đăng nhập
<img width="350" height="650" alt="dangnhap" src="https://github.com/user-attachments/assets/f8d3871c-c222-43a4-9e39-375712480471" />
###
### Giao diện trang chủ 
<img width="350" height="650" alt="trangchu" src="https://github.com/user-attachments/assets/62756e7d-be02-49d7-a595-c39e7a55a4ef" />
### Giao diện trang cá nhân
<img width="350" height="650" alt="trangcanhan" src="https://github.com/user-attachments/assets/b4112e31-1f50-42ba-8cf0-94020f230ca5" />
### Giao diện Phim chi tiết
<img width="350" height="650" alt="phim_chi_tiet" src="https://github.com/user-attachments/assets/116a3a8b-ff2b-4aa6-a2f3-7fd3ff89c3e4" />
### Giao diện đặt ghế ngồi
<img width="350" height="650" alt="chon_ghe_ngoi" src="https://github.com/user-attachments/assets/c27197a9-031e-49bc-ba06-f0ad79dc94f5" />
### Giao diện thanh toán
<img width="350" height="650" alt="thanhtoan" src="https://github.com/user-attachments/assets/011f8134-79f2-431f-a50e-9839410f6e9b" />


