import React from "react";
import { LuDownload } from "react-icons/lu";
import classes from './downloadExpense.module.css';
import { useSelector } from 'react-redux';

const DownloadExpense = () => {
    const expenseData = useSelector((state) => state.expense.expenses);

    const downloadHandler = () => {
        alert("Sure Download");
        const csvData = convertToCSV(expenseData);
        downloadCSV(csvData);
    }

    const convertToCSV = (data) => {
        const csvRows = [];
        console.log(csvRows);
        const headers = ["money", "Category", "description"];
        csvRows.push(headers.join(","));

        for (const row of data) {
            const values = headers.map((header) => {
                const escaped = String(row[header.toLowerCase()]).replace(/"/g, '\\"');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(","));
        }

        return csvRows.join("\n");
    };

    const downloadCSV = (csvData) => {
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'expenses.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <LuDownload className={classes.download} onClick={downloadHandler} />
    );
}

export default DownloadExpense;
