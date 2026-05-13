"use client";

import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "sonner";

interface ExportButtonProps {
  data: any[];
}

export function ExportButton({ data }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!data || data.length === 0) {
      toast.error("Tidak ada data untuk diekspor");
      return;
    }

    setIsExporting(true);
    try {
      // Prepare data for export
      const exportData = data.map((item) => ({
        "Judul Inovasi": item.judul,
        "NID": item.nid,
        "Nama": item.nama,
        "Bidang": item.bidang,
        "Kategori": item.kategoriInovasi,
        "Latar Belakang": item.latarBelakang,
        "Solusi": item.solusi,
        "Manfaat": item.manfaat,
        "Implementasi": item.implementasi,
        "Anggota Tim": item.jumlahAnggota,
        "Status": item.status,
        "Tanggal Submit": new Date(item.createdAt).toLocaleString("id-ID"),
      }));

      // Create workbook and worksheet
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Ideas");

      // Generate file and download
      XLSX.writeFile(wb, `IGNITE_2026_IDEAS_${new Date().getTime()}.xlsx`);
      
      toast.success("Data berhasil diekspor ke Excel");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Gagal mengekspor data");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      onClick={handleExport} 
      disabled={isExporting}
      className="bg-slate-950 hover:bg-slate-900 text-white font-bold rounded-xl gap-2 h-11 px-6 transition-all"
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      Export to Excel
    </Button>
  );
}
