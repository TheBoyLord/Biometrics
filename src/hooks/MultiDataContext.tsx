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

interface ContactItem {
  id: number;	
  ContactID: number;	
  ClientID: number;	
  FullName: string;	
  PartnerName: string;	
  CompanyName: string;	
  DepartmentName: string;	
  OfficeName: string;	
  Entity: string;	
  MailingName: string;	
  Prefix: string;	
  FirstName: string;	
  LastName: string;	
  Salutation: string;	
  MiddleName: string;	
  Suffix: string;	
  Gender: string;	
  DateOfBirth: string;	
  BirthPlace: string;	
  DateOfDeath: string;	
  Initials: string;	
  NINumber: string;	
  UTR: string;	
  PPSN: string;	
  HMRCR40: string;	
  OurRef: string;	
  Draft: number;	
  ApprovedBy: string;	
  BusinessType: string;	
  CreatedBy: string;	
  DateCreated: string;	
  Address1: string;	
  Address2: string;	
  Address3: string;	
  Town: string;	
  County: string;	
  Country: string;	
  PostCode: string;	
  Email: string;	
  CheckedOutDate: string;	
  CheckedOutBy: string;	
  ContactClosed: number;	
  ClosedReason: string;	
  ContactLastModified: string;	
  Fax: string;	
  Mobile: string;	
  contacttype: string;	
  CodeName: string;	
  RestrictedClientTeamAccess: number;
  clientCode: string;
}

interface ClientItem {
  Id: number;
  ClientID: number;
  ContactID: number;
  ParentName: string;
  ClientCode: string;
  CreatedDate: string;
  PeriodEndDate: string;
  BecameClient: string;
  ClientClosed: number;
  ClosedDate: string;
  CompanyRegistrationNo: string;
  CompanyTaxReference: string;
  ClosedReason: string;
  Draft: number;
  ApprovedBy: string;
  WonReason: string;
  yearend: string;
  ClientSupplierType: string; 
}
// Define the structure of Team
interface TeamItem {
  id: number;
  ContactId: number;
  ResponsibilityTypeID: number;
  ContactTeamId: number;
  EmployeeID: number;
  Description: string;
  fullName: string;
  clientCode: string;
  sortOrder: number;
  show: number;
}
// Define the structure of the company data
interface CompanyItem {
  accounts: {
    accounting_reference_date: {
      day: string;
      month: string;
    };
    last_accounts: {
      made_up_to: string;
      period_end_on: string;
      period_start_on: string;
      type: string;
    };
    next_accounts: {
      due_on: string;
      overdue: boolean;
      period_end_on: string;
      period_start_on: string;
    };
    next_due: string;
    next_made_up_to: string;
    overdue: boolean;
  };
  can_file: boolean;
  company_name: string;
  company_number: string;
  company_status: string;
  confirmation_statement: {
    last_made_up_to: string;
    next_due: string;
    next_made_up_to: string;
    overdue: boolean;
  };
  date_of_creation: string;
  etag: string;
  has_been_liquidated: boolean;
  has_charges: boolean;
  has_insolvency_history: boolean;
  jurisdiction: string;
  last_full_members_list_date: string;
  links: {
    persons_with_significant_control: string;
    self: string;
    filing_history: string;
    officers: string;
  };
  registered_office_address: {
    address_line_1: string;
    address_line_2?: string;
    locality: string;
    postal_code: string;
    region: string;
  };
  registered_office_is_in_dispute: boolean;
  sic_codes: string[]; // Array of strings
  type: string;
  undeliverable_registered_office_address: boolean;
  has_super_secure_pscs: boolean;
}

// Define the structure of the context
interface MultiDataContextType {
  accountItems: AccountItem[] | null;
  bookmarkItems: BookmarkItem[] | null;
  contactItems: ContactItem[] | null;
  clientItems: ClientItem[] | null;
  teamItems: TeamItem[] | null;
  companyItems: CompanyItem[] | null;
  loading: boolean;
  error: string | null;
}
//
// Create the context with an initial empty value
//
const MultiDataContext = createContext<MultiDataContextType>({
  accountItems: null,
  bookmarkItems: null,
  contactItems: null,
  clientItems: null,
  teamItems: null,
  companyItems: null,
  loading: true,
  error: null,
});
//
// Create a custom hook to use the MultiDataContext
//
export const useMultiDataContext = () => useContext(MultiDataContext);
//
// Create the provider component
//
export const MultiDataProvider = ({ children }: { children: ReactNode }) => {
  const [accountItems, setAccountItems] = useState<AccountItem[] | null>(null);
  const [bookmarkItems, setBookmarkItems] = useState<BookmarkItem[] | null>(null);
  const [contactItems, setContactItems] = useState<ContactItem[] | null>(null);
  const [clientItems, setClientItems] = useState<ClientItem[] | null>(null);
  const [teamItems, setTeamItems] = useState<TeamItem[] | null>(null);
  const [companyItems, setCompanyItems] = useState<CompanyItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //
  // Get Companies House data 
  //
  async function getCompanyData(regNo: string): Promise<any> {
    const paddedRegNo = regNo.padStart(8, '0');
    const endpoint = `https://api.companieshouse.gov.uk/company/${paddedRegNo}`;
    const authHeader = '6C_zXzSWy888EyqC8pPnrmeyB-bwQtcSj1235I6H'; // Replace with your actual auth token
    
    try {
      // Make the HTTP GET request using fetch
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
      });
      // Check if the response is OK (status code 200-299)
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse the response JSON
      const responseData = await response.json();
      // Optionally wrap the result in an array (as you did in SQL)
      const jsonResponse = [responseData];
      // Return the JSON response
      return jsonResponse;
    } catch (error) {
      console.error('Error fetching company data:', error);
      throw error;
    }
  }
  async function fetchCompanyDataForClients(clientItemsData: ClientItem[]): Promise<CompanyItem[]> {
    // Filter out clients without a `companyRegNo` and map to an array of promises
    const companyDataPromises = clientItemsData
      .filter(client => client.CompanyRegistrationNo) // Only include clients with a companyRegNo
      .map(client => getCompanyData(client.CompanyRegistrationNo) // Map to the company data fetching promise
        .then(companyDataArray => companyDataArray[0]) // Since getCompanyData returns an array, take the first element
        .catch(error => {
          console.error(`Failed to fetch data for ${client.CompanyRegistrationNo}:`, error);
          return null; // In case of error, return null so we can handle it
        })
      );
    // Wait for all promises to resolve
    const companyDataArray = await Promise.all(companyDataPromises);
    // Filter out any null values (where there was an error)
    return companyDataArray.filter(companyData => companyData !== null) as CompanyItem[];
  }


  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Use Promise.all to fetch data concurrently
        const [accountItemsResponse
          , bookmarkItemsResponse
          , contactItemsResponse
          , clientItemsResponse
          , teamItemsResponse
         ] = await Promise.all([
          fetch('https://marketingtest.jacrox.cloud/api/mobGetData.php?mode=1&clientCode=LOR010,PRO200'),   // AccountItem
          fetch('https://marketingtest.jacrox.cloud/api/mobGetData.php?mode=2&clientCode=LOR010,PRO200'),   // BookmarkItem
          fetch('https://marketingtest.jacrox.cloud/api/mobGetData.php?mode=3&clientCode=LOR010,PRO200'),   // ContactItem
          fetch('https://marketingtest.jacrox.cloud/api/mobGetData.php?mode=4&clientCode=LOR010,PRO200'),   // ClientItem
          fetch('https://marketingtest.jacrox.cloud/api/mobGetData.php?mode=5&clientCode=LOR010,PRO200'),   // TeamItem
        ]);
        //
        // Read accountItemsResponse as text first, then try to parse it
        //
        const accountItemsText = await accountItemsResponse.text();
        //console.log("Raw Account Items Response:", accountItemsText);
        let accountItemsData: AccountItem[] = [];
        try {
          accountItemsData = JSON.parse(accountItemsText); // Parse the text as JSON
          //console.log("Parsed Account Items Data:", accountItemsData);
        } catch (jsonError) {
          console.error("Failed to parse account items JSON:", jsonError);
          setError('Failed to parse account items data');
          return; // Exit early if JSON parsing fails
        }
        //
        // Read bookmarkItemsResponse and parse it
        //
        const bookmarkItemsText = await bookmarkItemsResponse.text();
        //console.log("Raw Bookmark Items Response:", bookmarkItemsText);
        let bookmarkItemsData: BookmarkItem[] = [];
        try {
          bookmarkItemsData = JSON.parse(bookmarkItemsText); // Parse the text as JSON
          //console.log("Parsed Bookmark Items Data:", bookmarkItemsData);
        } catch (jsonError) {
          console.error("Failed to parse bookmark items JSON:", jsonError);
          setError('Failed to parse bookmark items data');
          return; // Exit early if JSON parsing fails
        }
        //
        // Read contactItemsResponse and parse it
        //
        const contactItemsText = await contactItemsResponse.text();
        //console.log("Raw Bookmark Items Response:", contactItemsText);
        let contactItemsData: ContactItem[] = [];
        try {
          contactItemsData = JSON.parse(contactItemsText); // Parse the text as JSON
          //console.log("Parsed Bookmark Items Data:", contactItemsData);
        } catch (jsonError) {
          console.error("Failed to parse contact items JSON:", jsonError);
          setError('Failed to parse contact items data');
          return; // Exit early if JSON parsing fails
        }
        //
        // Read clientItemsResponse and parse it
        //
        const clientItemsText = await clientItemsResponse.text();
        //console.log("Raw Bookmark Items Response:", clientItemsText);
        let clientItemsData: ClientItem[] = [];
        try {
          clientItemsData = JSON.parse(clientItemsText); // Parse the text as JSON
          //console.log("Parsed Bookmark Items Data:", clientItemsData);
        } catch (jsonError) {
          console.error("Failed to parse client items JSON:", jsonError);
          setError('Failed to parse client items data');
          return; // Exit early if JSON parsing fails
        }
        //
        // Read teamItemsResponse and parse it
        //
        const teamItemsText = await teamItemsResponse.text();
        //console.log("Raw Bookmark Items Response:", teamItemsText);
        let teamItemsData: TeamItem[] = [];
        try {
          teamItemsData = JSON.parse(teamItemsText); // Parse the text as JSON
          //console.log("Parsed Bookmark Items Data:", teamItemsData);
        } catch (jsonError) {
          console.error("Failed to parse team items JSON:", jsonError);
          setError('Failed to parse team items data');
          return; // Exit early if JSON parsing fails
        }
        //
        // Set the parsed data in state
        //
        setAccountItems(accountItemsData);
        setBookmarkItems(bookmarkItemsData);
        setContactItems(contactItemsData);
        setClientItems(clientItemsData);
        setTeamItems(teamItemsData);
        //
        // Get misc data based on data already received
        //
        (async () => {
          try {
            //let companyItemsData: CompanyItem[] = [];
            const companyData = await fetchCompanyDataForClients(clientItemsData);
            //console.log('Fetched company data:', companyData);
            setCompanyItems(companyData);
          } catch (error) {
            console.error('Error fetching company data for clients:', error);
          }
        })();
      } catch (err) {
        console.error("Error during fetch:", err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  return (
    <MultiDataContext.Provider value={{ accountItems, bookmarkItems, contactItems, clientItems, teamItems, companyItems, loading, error }}>
      {children}
    </MultiDataContext.Provider>
  );
};