
import React, { useState, useMemo } from 'react';
import { InvoiceDetails } from './types';
import { InvoicePreview } from './components/InvoicePreview';

const initialInvoiceData: InvoiceDetails = {
  invoiceNumber: '1',
  dateMonth: 'MAYO',
  dateDay: '23',
  fromName: 'Leidy peréz',
  fromRole: 'PATRONISTA',
  clientName: 'Julian Severiche',
  clientBrand: 'JÁLATE Fashion',
  clientRole: 'EMPRESA',
  description: 'CAMISAS TRINIDAD OVERSIZE TALLA L-XL',
  units: '40',
  unitPrice: '6300',
  transport: '-10000',
  paymentInfo: 'JULIAN SEVERICHE\n324 466 9311\nNEQUI',
  residence: 'KR 78 #77-10\nSOLEDAD/ATLANTICO',
  phone: '3024131612',
  email: 'LUCYPEDRO.1519@GMAIL.COM',
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// --- Componente InputField (definido fuera de App) ---
interface InputFieldProps {
    label: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, placeholder, ...props }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        {...props}
      />
    </div>
);

// --- Componente TextAreaField (definido fuera de App) ---
interface TextAreaFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
}
  
const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, name, value, onChange, placeholder, rows = 3 }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full p-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
      />
    </div>
);


export function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceDetails>(initialInvoiceData);
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvoiceData(prev => ({ ...prev, [name]: value }));
  };

  const { subtotal, total } = useMemo(() => {
    const units = parseFloat(invoiceData.units) || 0;
    const unitPrice = parseFloat(invoiceData.unitPrice) || 0;
    const transport = parseFloat(invoiceData.transport) || 0;
    const subtotal = units * unitPrice;
    const total = subtotal + transport;
    return { subtotal, total };
  }, [invoiceData.units, invoiceData.unitPrice, invoiceData.transport]);


  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 p-4 sm:p-6 lg:p-8">
      {showPreview && <InvoicePreview details={invoiceData} onClose={() => setShowPreview(false)} />}
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white font-playfair">Generador de Facturas</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">Crea facturas con un diseño clásico y elegante.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold border-b border-slate-200 dark:border-slate-700 pb-3">Detalles de la Factura</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                  <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">Facturado Por:</h3>
                  <InputField label="Nombre" name="fromName" value={invoiceData.fromName} onChange={handleInputChange} placeholder="Tu Nombre"/>
                  <InputField label="Rol o Profesión" name="fromRole" value={invoiceData.fromRole} onChange={handleInputChange} placeholder="Tu Rol"/>
              </div>
               <div className="space-y-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                  <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">Facturado A:</h3>
                  <InputField label="Nombre del Cliente" name="clientName" value={invoiceData.clientName} onChange={handleInputChange} placeholder="Nombre del Cliente"/>
                  <InputField label="Nombre de la Marca" name="clientBrand" value={invoiceData.clientBrand} onChange={handleInputChange} placeholder="Marca del Cliente"/>
                  <InputField label="Rol del Cliente" name="clientRole" value={invoiceData.clientRole} onChange={handleInputChange} placeholder="EMPRESA"/>
              </div>
            </div>

            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-4 bg-slate-50 dark:bg-slate-700/50">
                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">Ítem de la Factura</h3>
                <TextAreaField label="Descripción del Producto/Servicio" name="description" value={invoiceData.description} onChange={handleInputChange} rows={2} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                   <InputField label="Unidades" name="units" type="number" value={invoiceData.units} onChange={handleInputChange} placeholder="0"/>
                   <InputField label="Valor Unitario (COP)" name="unitPrice" type="number" value={invoiceData.unitPrice} onChange={handleInputChange} placeholder="0"/>
                   <InputField label="Transporte/Descuento (COP)" name="transport" type="number" value={invoiceData.transport} onChange={handleInputChange} placeholder="0"/>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">Información de Pago</h3>
                    <TextAreaField label="Detalles (Banco, Nequi, etc.)" name="paymentInfo" value={invoiceData.paymentInfo} onChange={handleInputChange} rows={4} />
                </div>
                 <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">Datos de Contacto (Tus datos)</h3>
                    <InputField label="Email" name="email" value={invoiceData.email} onChange={handleInputChange} type="email" />
                    <InputField label="Teléfono" name="phone" value={invoiceData.phone} onChange={handleInputChange} />
                    <TextAreaField label="Lugar de Residencia" name="residence" value={invoiceData.residence} onChange={handleInputChange} rows={2} />
                </div>
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg space-y-4">
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">Metadata</h3>
               <InputField label="Número de Factura" name="invoiceNumber" value={invoiceData.invoiceNumber} onChange={handleInputChange}/>
               <div className="flex gap-4">
                <InputField label="Mes" name="dateMonth" value={invoiceData.dateMonth} onChange={handleInputChange} placeholder="MAYO"/>
                <InputField label="Día" name="dateDay" value={invoiceData.dateDay} onChange={handleInputChange} placeholder="23"/>
               </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg sticky top-8">
               <h2 className="text-2xl font-semibold mb-4 border-b pb-3 border-slate-200 dark:border-slate-700">Resumen</h2>
               <div className="space-y-3 mb-6 text-lg">
                 <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300">Subtotal:</span><span className="font-medium">{formatCurrency(subtotal)}</span></div>
                 <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300">Transporte:</span><span className="font-medium">{formatCurrency(parseFloat(invoiceData.transport) || 0)}</span></div>
                 <div className="border-t-2 border-dashed border-slate-200 dark:border-slate-700 my-2"></div>
                 <div className="flex justify-between text-2xl font-bold"><span className="text-slate-800 dark:text-white">TOTAL:</span><span className="text-indigo-600 dark:text-indigo-400">{formatCurrency(total)}</span></div>
               </div>
               <button
                  onClick={() => setShowPreview(true)}
                  className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/40"
                >
                  Generar Factura
               </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
