import { render, screen } from "@testing-library/react";
import DataTable from "../Components/DataTable";
import { userContext } from "../App";

describe("DataTable Component", () => {
  test("renders data test id correct", () => {

    // Mock user data
    const mockUser = { email: "purushu1995@gmail.com" };

    render(
      <userContext.Provider value={{ user: mockUser }}>
        <DataTable />
      </userContext.Provider>
    );

    const dataTable = screen.getByTestId("data-table");
    expect(dataTable).toBeInTheDocument();

    const EmailLabel = screen.getByText("Email Id :-");
    expect(EmailLabel).toBeInTheDocument(); 

    const customerList = screen.getByText("Customer List");
    expect(customerList).toBeInTheDocument(); 

  });

  test("searching functionality",async()=>{
    // Mock user data
    const mockUser = { email: "purushu1995@gmail.com" };

    render(
        <userContext.Provider value={{ user: mockUser }}>
        <DataTable />
        </userContext.Provider>
    );

    const searchInput = await screen.findByTestId("searching-data");
    expect(searchInput).toBeInTheDocument();

    
  })
});

describe("DataTable Button Element", () => {
    test("renders data test id correct", () => {
  
      // Mock user data
      const mockUser = { email: "purushu1995@gmail.com" };
  
      render(
        <userContext.Provider value={{ user: mockUser }}>
          <DataTable />
        </userContext.Provider>
      );
        const buttonElement = screen.getByRole("button", { name: "Add Data" });
        expect(buttonElement).toBeInTheDocument()    
    });

    
  test("searching functionality",async()=>{
    // Mock user data
    const mockUser = { email: "purushu1995@gmail.com" };

    render(
        <userContext.Provider value={{ user: mockUser }}>
        <DataTable />
        </userContext.Provider>
    );

    expect(await screen.findByText('Title')).toBeInTheDocument();
    expect(await screen.findByText('Description')).toBeInTheDocument();
    expect(await screen.findByText('Due Date')).toBeInTheDocument();
    expect(await screen.findByText('Priority')).toBeInTheDocument();
    expect(await screen.findByText('Status')).toBeInTheDocument();
    expect(await screen.findByText('Actions')).toBeInTheDocument();
    })
    
});


