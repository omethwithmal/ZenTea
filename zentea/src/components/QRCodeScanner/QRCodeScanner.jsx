import React, { useState, useEffect, useRef } from 'react';
import './QRCodeScanner.css'; // Import the CSS file

const IT22090508_QRcode_Scanner_Page = () => {
  const [scannedData, setScannedData] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCameraSupported, setIsCameraSupported] = useState(true);
  const scannerRef = useRef(null);

  useEffect(() => {
    // Check if browser supports media devices
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsCameraSupported(false);
      setErrorMessage('Camera access is not supported in your browser');
      return;
    }

    return () => {
      // Cleanup function to stop the scanner when the component unmounts
      if (scannerRef.current) {
        scannerRef.current.stop().catch((err) => {
          console.error('Error stopping QR scanner on cleanup:', err);
        });
      }
    };
  }, []);

  useEffect(() => {
    if (!isScanning || !isCameraSupported) return;

    const startScanner = async () => {
      try {
        const { Html5Qrcode } = await import('html5-qrcode');
        const html5QrCode = new Html5Qrcode('reader');
        scannerRef.current = html5QrCode;

        const qrCodeSuccessCallback = (decodedText) => {
          setScannedData(decodedText);
          setIsScanning(false);

          // Stop the scanner after detecting a QR code
          html5QrCode.stop().catch((err) => {
            console.error('Error stopping QR scanner:', err);
          });
        };

        const config = {
          fps: 10, // Frames per second
          qrbox: { width: 250, height: 250 }, // Define the scanning area
        };

        // Start scanning using the rear camera
        await html5QrCode.start(
          { facingMode: 'environment' },
          config,
          qrCodeSuccessCallback
        );
      } catch (err) {
        console.error('Error starting QR scanner:', err);
        setErrorMessage(
          err.message || 'Failed to start camera. Please ensure camera permissions are granted.'
        );
        setIsScanning(false);
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch((err) => {
          console.error('Error stopping QR scanner during cleanup:', err);
        });
      }
    };
  }, [isScanning, isCameraSupported]);

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
          <div className="IT22090508-QRcode-Scanner-error">
            {errorMessage}
            {!isCameraSupported && (
              <p>Please try using a modern browser like Chrome or Firefox.</p>
            )}
          </div>
        )}

        {!isScanning && !scannedData && (
          <button
            className="IT22090508-QRcode-Scanner-scan-button"
            onClick={handleStartScan}
            disabled={!isCameraSupported}
          >
            {isCameraSupported ? 'Start Scanning' : 'Camera Not Supported'}
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