import { useRef } from "react";
import useQuoteFormStore from "../../stores/useQuoteFormStore";

const validateForm = (form) => {
  const errors = {};
  if (!form.serviceType) errors.serviceType = "필수 입력 항목입니다";
  if (!form.spaceType) errors.spaceType = "필수 입력 항목입니다";
  if (!form.name) errors.name = "필수 입력 항목입니다";
  if (!form.phone) errors.phone = "필수 입력 항목입니다";
  if (!form.email) errors.email = "필수 입력 항목입니다";

  if (!/^[가-힣a-zA-Z\s]{2,}$/.test(form.name)) {
    errors.name = "이름은 한글 또는 영문 2자 이상이어야 합니다.";
  }
  if (!/^\d{3}-\d{3,4}-\d{4}$/.test(form.phone)) {
    errors.phone = "유효한 전화번호 형식이 아닙니다. 예: 010-1234-5678";
  }
  if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "유효한 이메일 형식이 아닙니다.";
  }
  if (form.area && !/^\d+$/.test(form.area)) {
    errors.area = "면적은 숫자만 입력 가능합니다.";
  }
  return errors;
};

const QuoteRequest = () => {
  const {
    form,
    images,
    errors,
    submitSuccess,
    showPreview,
    setForm,
    setImages,
    setErrors,
    setSubmitSuccess,
    setShowPreview,
    resetForm,
  } = useQuoteFormStore();

  const refs = {
    serviceType: useRef(),
    spaceType: useRef(),
    name: useRef(),
    phone: useRef(),
    email: useRef(),
    area: useRef(),
  };

  const updateField = (name, value) => {
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "area") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      updateField(name, onlyNumbers);
      return;
    }

    if (name === "phone") {
      let formatted = value.replace(/[^0-9]/g, "");
      if (formatted.length >= 3 && formatted.length <= 7) {
        formatted = formatted.replace(/(\d{3})(\d{1,4})/, "$1-$2");
      } else if (formatted.length > 7) {
        formatted = formatted.replace(/(\d{3})(\d{4})(\d{0,4})/, "$1-$2-$3");
      }
      updateField(name, formatted);
      return;
    }

    updateField(name, type === "checkbox" ? checked : value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type) || file.size > maxSize
    );

    if (invalidFiles.length > 0) {
      alert("이미지 형식만 가능, 파일당 최대 5MB까지 업로드 가능합니다.");
      e.target.value = "";
      setImages([]);
      return;
    }

    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstField = Object.keys(validationErrors)[0];
      refs[firstField]?.current?.focus();
      return;
    }

    if (!form.agree) {
      alert("개인정보 수집 및 이용에 동의해야 합니다.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(form)], { type: "application/json" })
    );

    if (images.length > 0) {
      images.forEach((file) => formData.append("images", file));
    } 

    try {
      const response = await fetch("http://localhost:8080/api/quotes", {
        method: "POST",
        body: formData,
      });

      const responseText = await response.text();
      console.log("응답 내용:", responseText);
      console.log("response", response);

      if (response.ok) {
        alert("견적 문의가 성공적으로 접수되었습니다!");
        resetForm({});
      } else {
        alert("견적 문의 전송 중 오류가 발생했습니다." + responseText);
      }
    } catch (error) {
      console.error("전송 오류:", error);
      alert("서버와 연결할 수 없습니다.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        🧼 청소 견적 문의
      </h2>

      {/* 서비스 유형 */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          서비스 유형 <span className="text-red-500">*</span>
        </label>
        <select
          name="serviceType"
          ref={refs.serviceType}
          value={form.serviceType}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
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

      {/* 공간 유형 */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          공간 유형 <span className="text-red-500">*</span>
        </label>
        <select
          name="spaceType"
          ref={refs.spaceType}
          value={form.spaceType}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
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

      {/* 면적 */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          면적 (㎡)
        </label>
        <input
          type="text"
          name="area"
          ref={refs.area}
          value={form.area}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* 사진 업로드 */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          사진 업로드 (다중 선택 가능)
        </label>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* 이름 */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          상호명 / 성함 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          ref={refs.name}
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* 연락처 */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          연락처 <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          ref={refs.phone}
          value={form.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* 이메일 */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          이메일 <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          ref={refs.email}
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* 지역 */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          지역
        </label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* 메시지 */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          문의 내용
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          className="w-full border px-3 py-2 rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* 동의 */}
      <div className="flex items-start">
        <input
          id="agree"
          type="checkbox"
          name="agree"
          checked={form.agree}
          onChange={handleChange}
          className="mt-1 mr-2"
        />
        <label
          htmlFor="agree"
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          개인정보 수집 및 이용에 동의합니다.
          <span className="text-red-500"> *</span>
        </label>
      </div>

      {/* 버튼 */}
      <div className="flex flex-wrap gap-4 justify-end pt-4">
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className="px-5 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white"
        >
          미리보기
        </button>{" "}
        {showPreview && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            onClick={() => setShowPreview(false)}
          >
            <div
              className="relative w-full max-w-2xl mx-4 md:mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
            >
              <h3 className="text-2xl font-semibold mb-5 text-gray-900 dark:text-gray-100">
                📋 미리보기
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-gray-700 dark:text-gray-300 text-sm">
                <div>
                  <span className="font-medium">이름 :</span> {form.name}
                </div>
                <div>
                  <span className="font-medium">연락처 :</span> {form.phone}
                </div>
                <div>
                  <span className="font-medium">이메일 :</span> {form.email}
                </div>
                <div>
                  <span className="font-medium">위치 :</span> {form.location}
                </div>
                <div>
                  <span className="font-medium">서비스 유형 :</span>{" "}
                  {form.serviceType}
                </div>
                <div>
                  <span className="font-medium">공간 유형 :</span>{" "}
                  {form.spaceType}
                </div>
                <div>
                  <span className="font-medium">면적 :</span> {form.area}
                </div>
                <div className="col-span-2">
                  <span className="font-medium">메시지 :</span>
                  <div className="whitespace-pre-wrap mt-1 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700">
                    {form.message || "없음"}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  첨부 이미지:
                </p>
                <div className="flex flex-wrap gap-4">
                  {images.length > 0 ? (
                    images.map((img, idx) => (
                      <img
                        key={idx}
                        src={URL.createObjectURL(img)}
                        alt={`preview-${idx}`}
                        className="w-32 h-auto rounded border shadow-md"
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      첨부된 이미지가 없습니다.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={() => setShowPreview(false)}
                  className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
        <button
          type="submit"
          className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
        >
          제출하기
        </button>
      </div>
    </form>
  );
};

export default QuoteRequest;
