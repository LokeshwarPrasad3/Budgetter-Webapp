import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { karlaFont } from '../../utils/font';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';

// Extend jsPDF type to include lastAutoTable
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}

interface Expense {
  sno: number;
  name: string;
  price: number;
  category: string;
  createdAt: string;
}

interface ExportTableProps {
  expenses: Expense[];
  createdAt: string;
}

const PDFExportComponent: React.FC<ExportTableProps> = ({
  expenses,
  createdAt,
}) => {
  const user = useSelector((state: any) => state.user?.user);
  const userDetails = {
    name: user?.name,
    username: user?.username,
    email: user?.email,
    currentPocketMoney: user?.currentPocketMoney,
    DOB: user?.DOB,
  };

  const exportPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');

    // 🔹 Register Karla Font
    doc.addFileToVFS('Karla-Regular.ttf', karlaFont);
    doc.addFont('Karla-Regular.ttf', 'Karla', 'normal');
    doc.setFont('Karla');

    // 🟢 Header Section (Light Gray Background)
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 210, 25, 'F');

    // 🔹 Logo & Title
    doc.addImage('/assets/logo/logo.png', 'PNG', 67, 4, 15, 15);
    doc.setFontSize(22);
    doc.setTextColor(31, 41, 55);
    doc.text('BUDGETTER.', 84, 16);

    // 🔹 User Details Section
    doc.setFontSize(14);
    doc.text('USER DETAILS', 13, 36);

    autoTable(doc, {
      startY: 41,
      head: [['Field', 'Details']],
      body: [
        ['Name', userDetails.name],
        ['Username', userDetails.username],
        ['Email', userDetails.email],
        ['Current Balance', userDetails.currentPocketMoney],
        // ['Date of Birth', userDetails.DOB],
      ],
      theme: 'grid',
      styles: { font: 'Karla', fontSize: 10, textColor: [31, 41, 55] },
      headStyles: { fillColor: [77, 107, 254], textColor: [255, 255, 255] },
      columnStyles: {
        0: { fontStyle: 'bold', halign: 'left' },
        1: { halign: 'left' },
      },
    });

    // 🔹 Expenses Table Heading
    doc.text('EXPENSES STATEMENT :', 13, doc.lastAutoTable.finalY + 10);
    // Get width of the first part
    const textWidth = doc.getTextWidth('EXPENSES STATEMENT : ');
    // Change font size to 12px for createdAt
    doc.setFontSize(12);
    doc.text(createdAt, 13 + textWidth, doc.lastAutoTable.finalY + 9.7);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 15,
      head: [['S.No.', 'Expense Name', 'Price', 'Category', 'Time']],
      body: expenses.map((expense, index) => [
        index + 1,
        expense.name,
        expense.price,
        expense.category,
        new Date(expense.createdAt).toLocaleString().split(',')[1],
      ]),
      theme: 'striped',
      styles: { font: 'Karla', fontSize: 10, textColor: [31, 41, 55] },
      headStyles: { fillColor: [77, 107, 254], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [243, 244, 246] },
    });

    // 🔹 Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Generated by Budgetter - Everyday Expenses Tracker', 10, 285);
    doc.text(new Date().toLocaleDateString(), 170, 285);

    // 🔹 Save PDF
    doc.save(`${userDetails.name}-statement.pdf`);
  };

  return (
    <div className="">
      <Button
        onClick={exportPDF}
        className="flex w-full items-center justify-center gap-1 bg-gradient-to-r from-purple-500 to-purple-700 text-gray-100 opacity-80 transition-all duration-200 ease-in hover:from-purple-600 hover:to-purple-800 hover:text-white hover:opacity-90 dark:hover:text-white"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <span>Export as PDF</span>
      </Button>
    </div>
  );
};

export default PDFExportComponent;
