import React, { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QrReader } from 'react-qr-reader';

export default function QRCodeGenerator() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', employeeID: '' });
  const [qrData, setQRData] = useState('');
  const [scannedData, setScannedData] = useState([]);
  const [scanStarted, setScanStarted] = useState(false);
  const qrRef = useRef(null);
  const qrReaderRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    const { firstName, lastName, employeeID } = formData;
    if (firstName && lastName && employeeID) {
      const data = `Name: ${firstName} ${lastName}, ID: ${employeeID}`;
      setQRData(data);
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = 'employee_qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleScan = (result, error) => {
    if (!!result) {
      const text = result?.text || result;
      const parsed = parseQRData(text);
      setScannedData((prev) => [...prev, parsed]);
    }

    if (error) {
      console.error('QR scan error:', error);
    }
  };

  const parseQRData = (text) => {
    const parts = text.split(',').map(part => part.trim());
    const name = parts[0]?.split(':')[1]?.trim() || '';
    const id = parts[1]?.split(':')[1]?.trim() || '';
    return { name, id };
  };

  const startScan = () => {
    setScanStarted(true);
  };

  const stopScan = () => {
    setScanStarted(false);
    // Explicitly stop the camera stream
    if (qrReaderRef.current) {
      const videoElement = qrReaderRef.current.querySelector('video');
      if (videoElement && videoElement.srcObject) {
        videoElement.srcObject.getTracks().forEach(track => track.stop());
      }
    }
  };

  // Clean up camera when component unmounts
  useEffect(() => {
    return () => {
      stopScan();
    };
  }, []);

  return (
    <div style={{
      fontFamily: 'Arial',
      maxWidth: '500px',
      margin: '40px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      textAlign: 'center'
    }}>
      <h2>QR Code Generator</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        style={{ padding: '10px', margin: '5px', width: '90%' }}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
        style={{ padding: '10px', margin: '5px', width: '90%' }}
      />
      <input
        type="text"
        name="employeeID"
        placeholder="Employee ID"
        onChange={handleChange}
        style={{ padding: '10px', margin: '5px', width: '90%' }}
      />
      <button onClick={handleGenerate} style={{
        padding: '10px 20px',
        margin: '10px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px'
      }}>Save</button>

      {qrData && (
        <div style={{ marginTop: '20px' }} ref={qrRef}>
          <QRCodeCanvas value={qrData} size={200} />
          <br />
          <button onClick={handleDownload} style={{
            marginTop: '15px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}>
            Download QR Code
          </button>
        </div>
      )}

      <h3 style={{ marginTop: '40px' }}>Scan QR Code</h3>
      
      {!scanStarted ? (
        <button 
          onClick={startScan} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginBottom: '20px'
          }}>
          Start QR Code Scan
        </button>
      ) : (
        <button 
          onClick={stopScan} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginBottom: '20px'
          }}>
          Stop Scanning
        </button>
      )}

      {scanStarted && (
        <div 
          ref={qrReaderRef}
          style={{ 
            width: '100%',
            height: '300px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid #ccc',
            borderRadius: '5px'
          }}>
          <QrReader
            onResult={handleScan}
            constraints={{ 
              facingMode: 'environment',
              aspectRatio: 1
            }}
            containerStyle={{
              position: 'relative',
              width: '100%',
              height: '100%',
              padding: 0,
              margin: 0
            }}
            videoContainerStyle={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
            videoStyle={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            scanDelay={300}
          />
        </div>
      )}

      {scannedData.length > 0 && (
        <div>
          <h3>Scanned Data</h3>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '10px'
          }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Employee ID</th>
              </tr>
            </thead>
            <tbody>
              {scannedData.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.name}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}