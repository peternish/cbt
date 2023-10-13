import * as React from 'react';
import { useState, useEffect } from 'react';

// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Button } from '@mui/material';

import PDF from './pdf';

export default function History() {

  const [pdfname, setPdfsrc] = useState('Alphabet');

  useEffect(() => {
    console.log(pdfname);
  },[pdfname])

  return (
    <div>

      <div className='row text-center' style={{height:'90vh'}}>
        <div className='col-2'>
          <div className='p-3' style={{height: '10vh'}}>
            <h3>{pdfname}</h3>
          </div>
          <ul className="nav flex-column">
            <Button style={{textTransform:'none'}} className="nav-link btn btn-outline-info" onClick={() => setPdfsrc('Alphabet')}>Alphabet</Button><hr/>
            <Button style={{textTransform:'none'}} className="nav-link btn btn-outline-info" onClick={() => setPdfsrc('Kindergarten Workbook')}>Kindergarten Workbook</Button><hr/>
            <Button style={{textTransform:'none'}} className="nav-link btn btn-outline-info" onClick={() => setPdfsrc('Practice Book')}>Practice Book</Button><hr/>
            <Button style={{textTransform:'none'}} className="nav-link btn btn-outline-info" onClick={() => setPdfsrc('Colors')}>Colors</Button><hr/>
            <Button style={{textTransform:'none'}} className="nav-link btn btn-outline-info" onClick={() => setPdfsrc('Word Recognition')}>Word Recognition</Button><hr/>
          </ul>
        </div>
        <div className='col-10'>
          <PDF pdfname = {pdfname} />
        </div>
      </div>

    </div>
  );
};