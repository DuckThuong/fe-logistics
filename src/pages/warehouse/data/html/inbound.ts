export const InboundHtml = `
<h2>Tổng quan</h2>
<p>
  Nhập kho là bước “chốt” dữ liệu đầu vào: xác nhận số lượng, tình trạng, lô hàng và gắn mã để theo dõi xuyên suốt.
  Quy trình chuẩn giúp giảm thất lạc, hạn chế sai lệch đối soát, và rút ngắn thời gian xử lý.
</p>

<h2>Luồng xử lý tiêu chuẩn (SOP)</h2>
<ol>
  <li><strong>Tiếp nhận</strong>: ghi nhận xe/đơn đến, chụp ảnh tình trạng kiện, đối chiếu chứng từ.</li>
  <li><strong>Kiểm đếm nhanh</strong>: đếm kiện theo lô, kiểm tra dấu hiệu rách/móp/ướt.</li>
  <li><strong>Dán mã & phân loại</strong>: gắn mã lô/đơn, phân luồng theo tuyến, theo kho, theo mức độ ưu tiên.</li>
  <li><strong>Nhập hệ thống</strong>: cập nhật trạng thái, cân/đo nếu cần, đồng bộ số liệu.</li>
  <li><strong>Đưa vào khu vực lưu kho</strong>: xếp vào kệ/ô theo vị trí (bin location) để tối ưu picking.</li>
</ol>

<h2>Bảng tiêu chí kiểm tra khi nhận hàng</h2>
<table>
  <tr>
    <th>Hạng mục</th>
    <th>Cách kiểm tra</th>
    <th>Kết quả</th>
  </tr>
  <tr>
    <td>Niêm phong</td>
    <td>Quan sát băng keo, tem, dấu mở kiện</td>
    <td>Đạt / Cần xử lý</td>
  </tr>
  <tr>
    <td>Tình trạng kiện</td>
    <td>Rách, móp, ẩm ướt, biến dạng</td>
    <td>Chụp ảnh + ghi chú</td>
  </tr>
  <tr>
    <td>Số lượng</td>
    <td>Đếm theo lô, đối chiếu chứng từ/manifest</td>
    <td>Khớp / Lệch</td>
  </tr>
  <tr>
    <td>Nhận diện</td>
    <td>Dán mã lô/đơn, phân tuyến</td>
    <td>Hoàn tất</td>
  </tr>
</table>

<h2>Khuyến nghị để nhập kho “mượt”</h2>
<ul>
  <li>Chuẩn hoá <em>mã lô</em> và <em>mã kiện</em> ngay tại bước tiếp nhận để tránh nhập liệu lại.</li>
  <li>Luôn chụp ảnh “3 góc”: mặt tem, mặt hư hỏng (nếu có), ảnh tổng lô.</li>
  <li>Thiết lập “làn ưu tiên” cho hàng gấp (SLA) để xử lý trước.</li>
</ul>
`;

