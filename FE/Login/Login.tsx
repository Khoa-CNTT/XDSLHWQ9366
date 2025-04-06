// import React from 'react'

export default function Login() {
  return (
    <div>

 <div className="col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 text-sm">Họ và tên</label>
                  <input
                    type="text"
                    name="fullName"
                    // value={formData.fullName}
                    // onChange={handleChange}
                    className="w-full border p-2 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm">Tên đăng nhập</label>
                  <input
                    type="text"
                    name="username"
                    // value={formData.username}
                    // onChange={handleChange}
                    disabled
                    className="w-full border p-2 rounded-lg bg-gray-100 cursor-not-allowed" //Không tương tác
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    // value={formData.email}
                    // onChange={handleChange}
                    className="w-full border p-2 rounded-lg"
                  />
                </div>

                <div>
                  <select
                    className="w-full border p-2 rounded-lg"
                    // value={formData.role}
                    // onChange={(e) =>
                    //   setFormData({ ...formData, role: e.target.value })
                    // }
                  >
                    <option value="Giáo viên">Giáo viên</option>
                    <option value="Học sinh">Học sinh</option>
                    <option value="Quản trị viên">Quản trị viên</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-600 text-sm">Số điện thoại</label>
                  <input
                    type="text"
                    name="phone"
                    // value={formData.phone}
                    // onChange={handleChange}
                    className="w-full border p-2 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm">Ngày sinh</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="dob"
                    //   value={formData.dob}
                    //   onChange={handleChange}
                      className="w-full border p-2 rounded-lg"
                    />
                    {/* <MdDateRange className="absolute right-3 top-3 text-gray-500" /> */}
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="text-gray-600 text-sm">
                    Địa chỉ hiện tại
                  </label>
                  <input
                    type="text"
                    name="address"
                    // value={formData.address}
                    // onChange={handleChange}
                    className="w-full border p-2 rounded-lg"
                  />
                </div>
              </div>

    </div>
  )
}
