import React, { useEffect, useMemo, useState } from "react";
import { Autocomplete, FormHelperText, TextField } from "@mui/material";
import { useFormik } from "formik";


const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const SearchInputForm = ({nameProp,errorProp,setValue,selectedValue,setSelectedValue,item}) => {

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  // const [filteredItems, setFilteredItems] = useState([]);
  // const [selectedValue, setSelectedValue] = useState({ label: "Apple", id: 1 });
  // const item = [
  //   { label: "Apple", id: 1 },
  //   { label: "Banana", id: 2 },
  //   { label: "Cherry", id: 3 },
  //   { label: "Date", id: 4 },
  //   { label: "Grape", id: 5 },
  //   { label: "Kiwi", id: 6 },
  // ];

  // const filteredItems = useMemo(() => {
  //   return item
  //     .filter((item1) =>
  //       item1.label.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //     .sort((a, b) => {
  //       const lengthComparison = a.label.length - b.label.length;
  //       if (lengthComparison !== 0) return lengthComparison;
  //       return a.label.localeCompare(b.label);
  //     });
  // }, [searchQuery, item]);

  
    const filteredItems = useMemo(() => {
      return item
        .filter((item1) =>
          item1.label.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        )
        .sort((a, b) => {
          const lengthComparison = a.label.length - b.label.length;
          if (lengthComparison !== 0) return lengthComparison;
          return a.label.localeCompare(b.label);
        });
    }, [debouncedSearchQuery, item]);




// console.log(item);


  

  // const formik = useFormik({
  //   initialValues: {
  //     category: "",
  //   },
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });

  return (
    <>
    
    <Autocomplete
      options={item}
    //   sx={{ backgroundColor: "white" }}
      fullWidth
      size="small"
      value={selectedValue}
      // value={{ label: "Apple", id: 1 }}
      getOptionLabel={(option) => option.label} // Specify how to display options
      filterOptions={(options) => filteredItems} // Use optimized filter
      renderOption={(props, option) => (
        <li {...props} key={option.id || option.label}>{option.label}</li> // Use unique key
      )}
      renderInput={(params) => (
        <TextField {...params} name={nameProp} onChange={(e) => setSearchQuery(e.target.value)} error={errorProp} helperText={errorProp} placeholder="Select from dropdown"/>
      )}
      onChange={(event, newValue) => {
  
        setSelectedValue(newValue);
        setValue(nameProp,newValue?.id);
      }
      }
    />


</>
  );
};

export default SearchInputForm;
