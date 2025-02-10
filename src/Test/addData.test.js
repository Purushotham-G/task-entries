import { render, screen, fireEvent } from '@testing-library/react';
import AddData from '../Components/AddData';

describe("Add Data components testings",()=>{
    test('renders data test id correct', () => {
        render(<AddData />);

        const addDataFile = screen.getByTestId('add-data')
        expect(addDataFile).toBeInTheDocument();
    });

    test("renders 'Add Data' when editData is false", () => {
        render(<AddData editData={false} />);

        //"Add Data" is displayed
        expect(screen.getByTestId("add-data")).toHaveTextContent("Add Data");
    });

    test("renders 'Add Data' when editData is true", () => {
        render(<AddData editData={true} />);

        //"Edit Data" is displayed
        expect(screen.getByTestId("add-data")).toHaveTextContent("Edit Data");
    });

    test("renders input field", () => {
        render(<AddData />);

        const inputElement = screen.getByTestId("title-input");
        expect(inputElement).toBeInTheDocument(); 

        const descriptionInput = screen.getByTestId("description-input");
        expect(descriptionInput).toBeInTheDocument();

        const dueDateInput = screen.getByTestId("dueDate-input");
        expect(dueDateInput).toBeInTheDocument();

        const labelElement = screen.getByTestId("priority-label"); 
        expect(labelElement).toBeInTheDocument();

        const labelStatus = screen.getByTestId("status-label");
        expect(labelStatus).toBeInTheDocument();

    });

    test("renders 'Add Data' when editData is true", () => {
        render(<AddData editData={true} />);

        //"Edit Data" is displayed
        const buttonElement = screen.getByRole("button", { name: "Update" });
        expect(buttonElement).toBeInTheDocument();
    });

    test("renders 'Add Data' when editData is false", () => {
        render(<AddData editData={false} />);

        //"Edit Data" is displayed
        const buttonElement = screen.getByRole("button", { name: "AddData" });
        expect(buttonElement).toBeInTheDocument();
    });

})

