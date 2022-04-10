import React from 'react'
import PropTypes from 'prop-types'
import { Markup } from 'interweave';
import { Paper } from '@material-ui/core';
 import DOMPurify from 'dompurify';
function ProductDescription({product}) {
    const safeDescription = DOMPurify.sanitize(product.description)
  return (
      <Paper elevation={0} style={{padding:'15px'}}>

          <Markup content={safeDescription}/>
      </Paper>
  )
}

ProductDescription.propTypes = {}

export default ProductDescription
