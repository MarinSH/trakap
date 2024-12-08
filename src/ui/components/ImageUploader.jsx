import React, { useState } from 'react';

const ImageUploader = ({ onImageUpload, isView, initialImageData }) => {
    const [imageData, setImageData] = useState(initialImageData || '');
    const [dragging, setDragging] = useState(false);

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);

        if (isView) return;

        const file = event.dataTransfer?.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageData(reader.result);
                onImageUpload(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePaste = (event) => {
        if (isView) return;

        const items = event.clipboardData?.items;
        if (items) {
            for (const item of items) {
                if (item.type.startsWith('image/')) {
                    const file = item.getAsFile();
                    if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setImageData(reader.result);
                            onImageUpload(reader.result);
                        };
                        reader.readAsDataURL(file);
                    }
                }
            }
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        if (isView) return;
        setDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragging(false);
    };

    const handleFileInputChange = (event) => {
        if (isView) return;

        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageData(reader.result);
                onImageUpload(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        if (isView) return;
        setImageData('');
        onImageUpload('');
    };

    return (
        <div
            className={`border-2 p-4 rounded-lg ${
                dragging ? 'border-secondary-500 bg-secondary-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onPaste={handlePaste}
        >
            <div className="flex justify-between items-center mb-4">
                
                {!isView && (
                    <label
                        htmlFor="file-input"
                        className="btn cursor-pointer"
                    >
                        <i className="fa-solid fa-upload"></i>
                    </label>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                    id="file-input"
                />

                {imageData && !isView && (
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="btn bg-gradient-to-r from-warning-500 to-warning-600 text-white rounded-lg hover:bg-warning-700"
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                )}
            </div>

            {isView ? (
                <>
                    {imageData ? (
                    <img
                        src={imageData}
                        alt="Image"
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                    ) : (
                        <p>
                            Aucune image.
                        </p>
                    )}
                </>
            ) : (
                <>
                    {imageData ? (
                        <img
                            src={imageData}
                            alt="Preview"
                            className="w-full h-auto rounded-lg"
                        />
                    ) : (
                        <p className="text-gray-500 text-center">
                            Glissez-déposez une image ici ou collez-la.
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default ImageUploader;
