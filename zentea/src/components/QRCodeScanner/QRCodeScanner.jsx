import React, { useState, useEffect } from 'react';
import './QRCodeScanner.css'; // Import the CSS file

const IT22090508_QRcode_Scanner_Page = () => {
  const [scannedData, setScannedData] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let scanner;

    if (isScanning) {
      import('html5-qrcode').then((Html5QrcodeModule) => {
        const html5QrCode = new Html5QrcodeModule.Html5Qrcode('reader');
        scanner = html5QrCode;

        const qrCodeSuccessCallback = (decodedText) => {
          setScannedData(decodedText);
          setIsScanning(false);

          // Stop the scanner after detecting a QR code
          html5QrCode
            .stop()
            .catch((err) => console.error('Error stopping QR scanner:', err));
        };

        const config = {
          fps: 10, // Frames per second
          qrbox: { width: 250, height: 250 }, // Define the scanning area
        };

        // Start scanning using the rear camera
        html5QrCode
          .start({ facingMode: 'environment' }, config, qrCodeSuccessCallback)
          .catch((err) => {
            console.error('Error starting QR scanner:', err);
            setErrorMessage(
              'Failed to start camera. Please ensure camera permissions are granted.'
            );
            setIsScanning(false);
          });
      });
    }

    return () => {
      // Cleanup function to stop the scanner when the component unmounts
      if (scanner) {
        scanner
          .stop()
          .catch((err) => console.error('Error stopping QR scanner on cleanup:', err));
      }
    };
  }, [isScanning]);

  const handleStartScan = () => {
    setScannedData('');
    setErrorMessage('');
    setIsScanning(true);
  };

  const handleReset = () => {
    setScannedData('');
    setErrorMessage('');
    setIsScanning(false);
  };

  return (
    <div className="IT22090508-QRcode-Scanner-container">
      {/* Header */}
      <header className="IT22090508-QRcode-Scanner-header">
        <h1>Attendance marking</h1>
        <h3>Scan your Id QR Code</h3>
      </header>

      {/* Main Content */}
      <main className="IT22090508-QRcode-Scanner-content">
        {errorMessage && (
          <div className="IT22090508-QRcode-Scanner-error">{errorMessage}</div>
        )}

        {!isScanning && !scannedData && (
          <button
            className="IT22090508-QRcode-Scanner-scan-button"
            onClick={handleStartScan}
          >
            Start Scanning
          </button>
        )}

        {isScanning && (
          <div id="reader" className="IT22090508-QRcode-Scanner-reader">
            <p className="camera-preview-text">Camera Preview</p>
          </div>
        )}

        {scannedData && (
          <div className="IT22090508-QRcode-Scanner-result">
            <h2>Scanned Details:</h2>
            <p>{scannedData}</p>
            <button
              className="IT22090508-QRcode-Scanner-reset-button"
              onClick={handleReset}
            >
              Scan Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default IT22090508_QRcode_Scanner_Page;
