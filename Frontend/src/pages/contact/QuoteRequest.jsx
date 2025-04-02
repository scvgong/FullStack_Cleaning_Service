import { useState, useRef } from "react";

const QuoteRequest = () => {
  const [form, setForm] = useState({
    serviceType: "",
    spaceType: "",
    area: "",
    name: "",
    phone: "",
    email: "",
    location: "",
    message: "",
    agree: false,
  });

  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const refs = {
    serviceType: useRef(),
    spaceType: useRef(),
    name: useRef(),
    phone: useRef(),
    email: useRef(),
    area: useRef(),
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "area") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      setForm({ ...form, [name]: onlyNumbers });
      if (errors.area && onlyNumbers) {
        setErrors((prev) => ({ ...prev, area: undefined }));
      }
      return;
    }

    if (name === "phone") {
      let formatted = value.replace(/[^0-9]/g, "");
      if (formatted.length >= 3 && formatted.length <= 7) {
        formatted = formatted.replace(/(\d{3})(\d{1,4})/, "$1-$2");
      } else if (formatted.length > 7) {
        formatted = formatted.replace(/(\d{3})(\d{4})(\d{0,4})/, "$1-$2-$3");
      }
      setForm({ ...form, [name]: formatted });
      if (errors.phone && formatted) {
        setErrors((prev) => ({ ...prev, phone: undefined }));
      }
      return;
    }

    const updatedForm = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };
    setForm(updatedForm);

    // 필수 필드 수정 시 에러 제거
    if (errors[name] && updatedForm[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const required = ["serviceType", "spaceType", "name", "phone", "email"];
    const newErrors = {};
    for (let field of required) {
      if (!form[field]) {
        newErrors[field] = "필수 입력 항목입니다";
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const firstField = Object.keys(newErrors)[0];
      refs[firstField]?.current?.focus();
      return;
    }

    if (!form.agree) {
      alert("개인정보 수집 및 이용에 동의해야 합니다.");
      return;
    }

    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch("http://localhost:8080/api/quotes", {
        method: "POST",
        body: formData,
      });
      console.log("response", response);

      if (response.ok) {
        setSubmitSuccess(true);
        alert("견적 문의가 성공적으로 접수되었습니다!");
        setForm({
          serviceType: "",
          spaceType: "",
          area: "",
          name: "",
          phone: "",
          email: "",
          location: "",
          message: "",
          agree: false,
        });
        setImage(null);
        setErrors({});
        setSubmitSuccess(true);
      } else {
        alert("견적 문의 전송 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("전송 오류:", error);
      alert("서버와 연결할 수 없습니다.");
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">견적 문의</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">
            서비스 유형<span className="text-red-500">*</span>
          </label>
          <select
            name="serviceType"
            ref={refs.serviceType}
            value={form.serviceType}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">선택하세요</option>
            <option value="입주청소">입주청소</option>
            <option value="인테리어청소">인테리어청소</option>
            <option value="준공청소">준공청소</option>
            <option value="카펫청소">카펫청소</option>
            <option value="외벽청소">외벽청소</option>
          </select>
          {errors.serviceType && (
            <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">
            공간 유형<span className="text-red-500">*</span>
          </label>
          <select
            name="spaceType"
            ref={refs.spaceType}
            value={form.spaceType}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">선택하세요</option>
            <option value="주거공간">주거공간</option>
            <option value="사무공간">사무공간</option>
            <option value="상업공간">상업공간</option>
          </select>
          {errors.spaceType && (
            <p className="text-red-500 text-sm mt-1">{errors.spaceType}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">면적 (㎡)</label>
          <input
            type="text"
            name="area"
            ref={refs.area}
            value={form.area}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">이미지 업로드</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>
        <div>
          <label className="block font-medium">
            상호명 / 성함<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            ref={refs.name}
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">
            연락처<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            ref={refs.phone}
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">
            이메일<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            ref={refs.email}
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">지역</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">문의 내용</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
        </div>
        <div className="flex items-start">
          <input
            id="agree"
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            className="mr-2 mt-1"
          />
          <label htmlFor="agree" className="cursor-pointer">
            개인정보 수집 및 이용에 동의합니다.
            <span className="text-red-500"> *</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          제출하기
        </button>
      </form>
    </section>
  );
};

export default QuoteRequest;
