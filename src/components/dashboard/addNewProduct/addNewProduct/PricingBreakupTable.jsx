import React, { useState } from 'react'
import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    TableContainer,
    Paper,
    Divider,
    Button,
    Box,

  } from "@mui/material";
  import CloseIcon from '@mui/icons-material/Close';

const PricingBreakupTable = ({pricingBreakup,open,setOpen}) => {
    const [showBreakup,setShowBreakup]=useState(false);

    const handleClose = () => setOpen(false);
    
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '16px', // Add border radius
            py:2,
            px:2,
          },
        }}
      >
        <DialogTitle style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
          Price Details
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: 'absolute', right: 8, top: 8, fontSize: '0.8rem' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ padding: '8px' }}>
          {/* Table for Price Details */}
          <TableContainer
            component={Paper}
            elevation={0}
            style={{ boxShadow: 'none' }}
          >
            <Table
              size="small"
              style={{
                borderCollapse: 'collapse', // Remove all table borders
              }}
            >
              <TableHead>
                  <TableRow sx={{ backgroundColor:"#FFF9F2" }}>
                    <TableCell sx={{fontWeight:"bolder",py:2}}>Components</TableCell>
                    <TableCell align="right" sx={{fontWeight:"bolder",py:2}} >Base Amount</TableCell>
                  </TableRow>
                </TableHead>
              
                {/* Price Detail Rows */}

                <TableBody >
                    {/* //   row 1 -----------------------------------------------------------------------  */}
                    <TableRow
                    
                    style={{
                      borderBottom: 'none', // Remove bottom border from rows
                    }}
                  >
                    <TableCell
                      style={{
                        fontSize: '0.8rem',
                        padding: '8px 8px',
                        borderBottom: 'none', // Remove table cell border
                      }}
                    >
                      <Typography variant="body2">Tag Price (Inclusive of Taxes)</Typography>
                    </TableCell>
                    
                    <TableCell
                      align="right"
                      style={{
                        fontSize: '0.8rem',
                        padding: '8px 8px',
                        borderBottom: 'none', // Remove table cell border
                      }}
                    >
                      <Typography variant="body2">{pricingBreakup?.tag_price}</Typography>
                      
                    </TableCell>
                    
                    
                  </TableRow>
                  {/*  -----------------------------------------------------------------------  */}
                    {/* //   row 2 -----------------------------------------------------------------------  */}
                    <TableRow
                
                    style={{
                      borderBottom: 'none', // Remove bottom border from rows
                    }}
                  >
                    <TableCell
                      style={{
                        fontSize: '0.8rem',
                        padding: '8px 8px',
                        borderBottom: 'none', // Remove table cell border
                      }}
                    >
                      <Typography variant="body2">Base Price</Typography>
                    </TableCell>
                    
                    <TableCell
                      align="right"
                      style={{
                        fontSize: '0.8rem',
                        padding: '8px 8px',
                        borderBottom: 'none', // Remove table cell border
                      }}
                    >
                      <Typography variant="body2">{pricingBreakup?.base_price}</Typography>
                      
                    </TableCell>
                    
                    
                  </TableRow>
                  {/*  -----------------------------------------------------------------------  */}
                    {/* //   row 3 -----------------------------------------------------------------------  */}
                    <TableRow
                   
                    style={{
                      borderBottom: 'none', // Remove bottom border from rows
                    }}
                  >
                    <TableCell
                      style={{
                        fontSize: '0.8rem',
                        padding: '8px 8px',
                        borderBottom: 'none', // Remove table cell border
                      }}
                    >
                      <Typography variant="body2">Seller Price</Typography>
                    </TableCell>
                    
                    <TableCell
                      align="right"
                      style={{
                        fontSize: '0.8rem',
                        padding: '8px 8px',
                        borderBottom: 'none', // Remove table cell border
                      }}
                    >
                      <Typography variant="body2">{pricingBreakup?.seller_price}</Typography>
                      
                    </TableCell>
                    
                    
                  </TableRow>
                  {/*  -----------------------------------------------------------------------  */}
                    {/* //   row 4 -----------------------------------------------------------------------  */}
                    <TableRow
              
                    style={{
                      borderBottom: '1px solid gray', // Remove bottom border from rows
                    }}
                    
                  >
                    <TableCell
                      style={{
                        fontSize: '0.8rem',
                        padding: '8px 8px',
                        borderBottom: 'none', // Remove table cell border
                      }}
                    >
                      <Typography variant="body2">Platform Charges</Typography>
                      <Button  sx={{fontSize:"12px", px:0 , '&: hover':{
                        backgroundColor:"transparent"
                      }}} disableRipple 
                      onClick={() => setShowBreakup(!showBreakup)}
                      >{!showBreakup?"View platform charges breakup":"Hide platform charges breakup"}</Button>
                    </TableCell>
                    
                    <TableCell
                      align="right"
                      style={{
                        fontSize: '0.8rem',
                        padding: '8px 8px',
                        borderBottom: 'none', // Remove table cell border
                      }}
                    >
                      <Typography variant="body2">{pricingBreakup?.platform_charge}</Typography>
                      
                    </TableCell>
                    
                    
                  </TableRow>
                      {
                        showBreakup&&(
                            <>
                                {/* row hidden 1 -------------------------------------------------- */}
                                <TableRow
                                        
                                        style={{
                                        borderBottom: 'none', // Remove bottom border from rows
                                        }}
                                        
                                    >
                                        <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            padding: '8px 8px',
                                            borderBottom: 'none', // Remove table cell border
                                        }}
                                        >
                                        <Typography variant="body2">Logistic Cost</Typography>
                                        </TableCell>
                                        
                                        <TableCell
                                        align="right"
                                        style={{
                                            fontSize: '0.8rem',
                                            padding: '8px 8px',
                                            borderBottom: 'none', // Remove table cell border
                                        }}
                                        >
                                        <Typography variant="body2">{pricingBreakup?.logistic_cost}</Typography>
                                        
                                        </TableCell>
                                        
                                        
                                    </TableRow>
                                {/* row hidden 2 -------------------------------------------------- */}
                                <TableRow
                                        
                                        style={{
                                        borderBottom: 'none', // Remove bottom border from rows
                                        }}
                                        
                                    >
                                        <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            padding: '8px 8px',
                                            borderBottom: 'none', // Remove table cell border
                                        }}
                                        >
                                        <Typography variant="body2">IZ Commission</Typography>
                                        </TableCell>
                                        
                                        <TableCell
                                        align="right"
                                        style={{
                                            fontSize: '0.8rem',
                                            padding: '8px 8px',
                                            borderBottom: 'none', // Remove table cell border
                                        }}
                                        >
                                        <Typography variant="body2">{pricingBreakup?.iz_commission}</Typography>
                                        
                                        </TableCell>
                                        
                                        
                                    </TableRow>
                                {/* row hidden 3 -------------------------------------------------- */}
                                <TableRow
                                        
                                        
                                        
                                    >
                                        <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            padding: '8px 8px',
                                            borderBottom: 'none', // Remove table cell border
                                        }}
                                        >
                                        <Typography variant="body2">Closing Charges</Typography>
                                        </TableCell>
                                        
                                        <TableCell
                                        align="right"
                                        style={{
                                            fontSize: '0.8rem',
                                            padding: '8px 8px',
                                            borderBottom: 'none', // Remove table cell border
                                        }}
                                        >
                                        <Typography variant="body2">{pricingBreakup?.closing_charges}</Typography>
                                        
                                        </TableCell>
                                        
                                        
                                    </TableRow>
                                {pricingBreakup?.insurance_premium && <TableRow
                                        
                                        style={{
                                        borderBottom: '1px dashed gray', // Remove bottom border from rows
                                        }}
                                        
                                    >
                                        <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            padding: '8px 8px',
                                            borderBottom: 'none', // Remove table cell border
                                        }}
                                        >
                                        <Typography variant="body2">Insurance Premium</Typography>
                                        </TableCell>
                                        
                                        <TableCell
                                        align="right"
                                        style={{
                                            fontSize: '0.8rem',
                                            padding: '8px 8px',
                                            borderBottom: 'none', // Remove table cell border
                                        }}
                                        >
                                        <Typography variant="body2">{pricingBreakup?.insurance_premium}</Typography>
                                        
                                        </TableCell>
                                        
                                        
                                    </TableRow>}
                            </>
                        )
                      }

                  {/*  -----------------------------------------------------------------------  */}
                    {/* //   row 5 -----------------------------------------------------------------------  */}
                    <TableRow
             
                    style={{
                      borderBottom: 'none', // Remove bottom border from rows
                    }}
                  >
                    <TableCell
                      style={{
                        fontSize: '0.8rem',
                        padding: '8px 8px',
                        borderBottom: 'none', // Remove table cell border
                      }}
                    >
                      <Typography variant="body2">Total Tax</Typography>
                    </TableCell>
                    
                    <TableCell
                      align="right"
                      style={{
                        fontSize: '0.8rem',
                        padding: '8px 8px',
                        borderBottom: 'none', // Remove table cell border
                      }}
                    >
                      <Typography variant="body2">{pricingBreakup?.total_tax}</Typography>
                      
                    </TableCell>
                    
                    
                  </TableRow>
                  {/*  -----------------------------------------------------------------------  */}
                    {/* //   row 1 -----------------------------------------------------------------------  */}
                    <TableRow
           
                    style={{
                      borderBottom: 'none', // Remove bottom border from rows
                    }}
                  >
                    <TableCell
                      style={{
                        fontSize: '0.8rem',
                        padding: '8px 8px',
                        borderBottom: 'none', // Remove table cell border
                      }}
                    >
                      <Typography variant="body2">Final Seller Price</Typography>
                    </TableCell>
                    
                    <TableCell
                      align="right"
                      style={{
                        fontSize: '0.8rem',
                        padding: '8px 8px',
                        borderBottom: 'none', // Remove table cell border
                      }}
                    >
                      <Typography variant="body2">{pricingBreakup?.final_seller_price}</Typography>
                      
                    </TableCell>
                    
                    
                  </TableRow>
                  {/*  -----------------------------------------------------------------------  */}
                    {/* //   row 1 -----------------------------------------------------------------------  */}
                    <TableRow
           
                    style={{
                      borderBottom: 'none', // Remove bottom border from rows
                    }}
                    sx={{
                        backgroundColor:"success.light"
                    }}
                  >
                    <TableCell
                      style={{
                        fontSize: '0.8rem',
                        padding: '8px 8px',
                        borderBottom: 'none', // Remove table cell border
                      }}
                    >
                      <Typography variant="body2">Final Indiazona Price</Typography>
                    </TableCell>
                    
                    <TableCell
                      align="right"
                      style={{
                        fontSize: '0.8rem',
                        padding: '8px 8px',
                        borderBottom: 'none', // Remove table cell border
                      }}
                    >
                      <Typography variant="body2">{pricingBreakup?.final_iz_price}</Typography>
                      
                    </TableCell>
                    
                    
                  </TableRow>
                    <TableRow
                  
                    style={{
                      borderBottom: 'none', // Remove bottom border from rows
                    }}
                  >
                    <TableCell
                      style={{
                        fontSize: '0.8rem',
                        padding: '8px 8px',
                        borderBottom: 'none', // Remove table cell border
                      }}
                    >
                      <Typography variant="body2">Automated Discount</Typography>
                    </TableCell>
                    
                    <TableCell
                      align="right"
                      style={{
                        fontSize: '0.8rem',
                        padding: '8px 8px',
                        borderBottom: 'none', // Remove table cell border
                      }}
                    >
                      <Typography variant="body2">{pricingBreakup?.automated_discount}%</Typography>
                      
                    </TableCell>
                    
                    
                  </TableRow>
                  {/*  -----------------------------------------------------------------------  */}

                  </TableBody>
                  
                  
               
                {/* Highlighted Final Price */}
                

              
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
  )
}

export default PricingBreakupTable
