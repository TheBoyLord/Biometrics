import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the structure of the data with an interface
interface AccountItem {
  id: number;
  directDebitStatusID: number;
  ddDesc: string;
  ddAccountNumber: string;
  ddCCHContactID: number;
  ddClientID: number;
  ddFullName: string;
  ddPartnerName: string;
  ddSalutation: string;
  ddEmailAddress: string;
  ddCCHBalance: number;
  ddSepBill_PAYROLL: string;
  ddSepBill_PAYROLL_NOT_COMPLEX: string;
  ddSepBill_PTAX: string;
  ddAssignmentTypes: string;	
  ddLastStatementSentDate: string;
  ddLastStatementStatus: string;
  latestInvoiceDate: string;
  latestReceiptDate: string;
}

interface BookmarkItem {
  id: number;
  clientCode: string;
  clientName: string;	
  clientEmail: string;
  salutation: string;
  Partner: string;
  PartnerId: number;	
  PartnerEmail: string;	
  partnerTitle: string;
  AssignmentManager: string;
  AssignmentManagerId: number;	
  AssignmentManagerEmail: string;
  AssignmentManagerTitle: string;
  AssignmentPartner: string;
  AssignmentPartnerId: number;	
  AssignmentPartnerEmail: string;
  AssignmentPartnerTitle: string;	
  Manager: string;
  ManagerId: number;	
  ManagerEmail: string;
  ManagerTitle: string;	
  TaxPartner: string;
  TaxPartnerId: number;
  TaxPartnerEmail: string;
  TaxPartnerTitle: string;
  TaxManager: string;	
  TaxManagerId: number;	
  TaxManagerEmail: string;
  TaxManagerTitle: string;
  TaxStaff: string;
  TaxStaffId: number;	
  TaxStaffEmail: string;
  TaxStaffTitle: string;
  TaxAlternativeTax: string;
  TaxAlternativeTaxId: number;
  TaxAlternativeTaxEmail: string;
  TaxAlternativeTaxTitle: string;
  TaxAlternativeManager: string;
  TaxAlternativeManagerId: number;
  TaxAlternativeManagerEmail: string;
  TaxAlternativeManagerTitle: string;
  TaxAlternativePartner: string;
  TaxAlternativePartnerId: number;	
  TaxAlternativePartnerEmail: string;
  TaxAlternativePartnerTitle: string;
  PayrollStaff: string;
  PayrollStaffId: number;
  PayrollStaffEmail: string;	
  PayrollStaffTitle: string;
  Admin: string;
  AdminId: number;	
  AdminEmail: string;
  AdminTitle: string;
  Accountant: string;
  AccountantId: number;
  AccountantEmail: string;
  AccountantTitle: string;
  ClientManager: string;
  ClientManagerId: string;
  ClientManagerEmail: string;
  ClientManagerTitle: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;	
  town: string;
  county: string;
  country: string;
  postalCode: string;
  yearEndDate: string;
  yearEndMMDD: string;
  clientId: number;
  contactId: number;	
  practiceManagerEmail: string;
}

// Define the structure of the context
interface MultiDataContextType {
  accountItems: AccountItem[] | null;
  bookmarkItems: BookmarkItem[] | null;
  loading: boolean;
  error: string | null;
}

// Create the context with an initial empty value
const MultiDataContext = createContext<MultiDataContextType>({
  accountItems: null,
  bookmarkItems: null,
  loading: true,
  error: null,
});

// Create a custom hook to use the MultiDataContext
export const useMultiDataContext = () => useContext(MultiDataContext);

// Create the provider component
export const MultiDataProvider = ({ children }: { children: ReactNode }) => {
  const [accountItems, setAccountItems] = useState<AccountItem[] | null>(null);
  const [bookmarkItems, setBookmarkItems] = useState<BookmarkItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Step 1: Use Promise.all to fetch data concurrently
        const [accountItemsResponse, bookmarkItemsResponse] = await Promise.all([
          fetch('https://marketingtest.jacrox.cloud/api/testJson.php?mode=1&clientCode=LOR010,PRO200'),  // Replace with actual user API
          fetch('https://marketingtest.jacrox.cloud/api/testJson.php?mode=2&clientCode=LOR010,PRO200'),  // Replace with actual product API
        ]);

        // Step 2: Parse responses
        const accountItemsData: AccountItem[] = await accountItemsResponse.json();
        const bookmarkItemsData: BookmarkItem[] = await bookmarkItemsResponse.json();

        // Step 3: Set data in state
        setAccountItems(accountItemsData);
        setBookmarkItems(bookmarkItemsData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();  // Fetch data on component mount
  }, []);

  return (
    <MultiDataContext.Provider value={{ accountItems, bookmarkItems, loading, error }}>
      {children}
    </MultiDataContext.Provider>
  );
};