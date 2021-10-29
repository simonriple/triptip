import { useState } from "react";

export function AddTrip(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [position, setPosition] = useState("");

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function changeImageUrl(event) {
    setImageUrl(event.target.value);
  }

  function changeCaption(event) {
    setCaption(event.target.value);
  }

  function changePosition(event) {
    setPosition(event.target.value);
  }

  async function addTrip() {
    const positionSplit = position.split(",");
    const latitude = positionSplit[0];
    const longitude = positionSplit[1];

    props.onAddTrip({
      caption: caption,
      image: imageUrl,
      position: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
    
    closeModal()
  }

  return (
    <div className="add-trip-container">
      <button className="camera-button" onClick={openModal}>
        📸
      </button>
      {modalOpen && (
        <div className="modal-container">
          <div className="modal">
            <button className="close-modal-button" onClick={closeModal}>
              ❌
            </button>
            <h1>Last opp en ny tur</h1>
            <input
              className="add-trip-dialog-input"
              value={imageUrl}
              onChange={changeImageUrl}
              placeholder="Url til bildet"
            />
            <input
              className="add-trip-dialog-input"
              value={caption}
              onChange={changeCaption}
              placeholder="Caption"
            />
            <input
              className="add-trip-dialog-input"
              value={position}
              onChange={changePosition}
              placeholder="Position"
            />
            <button className="add-trip-dialog-button" onClick={addTrip}>
              Last opp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
