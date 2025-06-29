"use client";

import React, { useState } from "react";
import Footer from "@/components/NavBar/Footer";
import NavBar from "@/components/NavBar/navBar";
import Modal from "@/components/common/modal";
import CompanyForm from "@/components/forms/CompanyForm";
import { Company } from "@/store/companies";

export default function CompanyDetailsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(
    undefined
  );

  // معرف المستخدم الحالي (يمكن الحصول عليه من localStorage أو context)
  const currentUserId = 1; // مثال: معرف المستخدم الحالي

  const handleAddCompany = () => {
    setSelectedCompany(undefined);
    setIsModalOpen(true);
  };

  const handleEditCompany = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(undefined);
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col w-full items-center gap-10 py-5 md:py-10 mt-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">تفاصيل الشركة</h1>

          {/* زر إضافة شركة جديدة */}
          <button
            onClick={handleAddCompany}
            className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            إضافة شركة جديدة
          </button>

          {/* Modal لإضافة/تعديل الشركة */}
          {isModalOpen && (
            <Modal
              title={selectedCompany ? "تعديل الشركة" : "إضافة شركة جديدة"}
              onClose={handleCloseModal}
              content={
                <CompanyForm
                  company={selectedCompany}
                  onClose={handleCloseModal}
                  userId={currentUserId} // تمرير معرف المستخدم الحالي
                  hideUserSelect={true} // إخفاء select المستخدمين
                />
              }
              size="lg"
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
