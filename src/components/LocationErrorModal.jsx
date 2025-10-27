// components/LocationErrorModal.js
import React from "react";

const LocationErrorModal = ({ onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3 className="modal-title">위치 권한 오류</h3>
        <p className="modal-message">
          위치 정보 접근이 거부되었습니다.
          <br />
          기본 위치로 표시합니다.
        </p>
        <button className="modal-button" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default LocationErrorModal;
