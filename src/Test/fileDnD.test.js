import { render, screen, fireEvent, waitFor } from "@testing-library/react";

//components
import FileDragAndDrop from "../Components/FileDragAndDrop";

jest.mock("firebase/storage", () => ({
    getStorage: jest.fn(),
    ref: jest.fn(),
    uploadBytes: jest.fn(() => Promise.resolve({ ref: { fullPath: "mocked/path" } })),
    getDownloadURL: jest.fn(() => Promise.resolve("https://mocked-url.com/image.jpg")),
  }));

describe("FileDragAndDrop Component", () => {
    test("renders the file uploader component",() => {
    render(<FileDragAndDrop />);

    const fileDnD = screen.getByTestId('file-drag-drop')
    expect(fileDnD).toBeInTheDocument();
    
    });

    test("when no file is selected, alert Show", () => {
        render(<FileDragAndDrop />);
    
        //window alert
        window.alert = jest.fn();
    
        // Call uploadFile with no file
        fireEvent.change(screen.getByTestId("file-drag-drop"), { target: { files: [] } });
      });

      test("when file is uploaded successfully, alert Show ", async () => {
        render(<FileDragAndDrop />);
    
        // window alert
        window.alert = jest.fn();
    
        // Create a mock file
        const file = new File(["dummy content"], "test.png", { type: "image/png" });
    
        // file upload
        fireEvent.change(screen.getByTestId("file-drag-drop"), { target: { files: [file] } });
    
      });
    
});

