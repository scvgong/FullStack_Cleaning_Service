import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">관리자 대시보드</h1>
      <section className="bg-white shadow rounded p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/admin/quotes" className="text-blue-600 hover:underline">
            📋 견적 관리
          </Link>
          <Link to="/admin/faqs" className="text-blue-600 hover:underline">
            ❓ FAQ 관리
          </Link>
          <Link to="/admin/register" className="text-blue-600 hover:underline">
            📝 관리자 등록
          </Link>
          <Link to="/admin/inquiries" className="text-blue-600 hover:underline">
            📬 문의 관리
          </Link>
        </div>
      </section>
    </div>
  );
}
