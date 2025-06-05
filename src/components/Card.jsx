import React, { useEffect, useState, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { itineraryData } from "../mock/data.js";

import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png";
import paperpinIcon from "../assets/paper-pin.png";
import googlemapIcon from "../assets/googlemaps.png";
import toggle from "../assets/toggle.png";
import star from "../assets/star.png";

const ITEM_TYPE = "ITINERARY_ITEM";

// Individual draggable item component
const DraggableItineraryItem = ({ item, index, moveItem }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [size, setSize] = useState({ width: 50, height: 50 });
  const [showBigScreenEdit, setShowBigScreenEdit] = useState(true);
 
  useEffect(() => {
    const updateSizeAndVisibility = () => {
      if (window.innerWidth >= 640) {
        setSize({ width: 110, height: 110 });
       
        setShowBigScreenEdit(true);
      } else {

        setSize({ width: 50, height: 50 });
        setShowBigScreenEdit(false);
      }
    };

    updateSizeAndVisibility(); // initial check

    window.addEventListener('resize', updateSizeAndVisibility);
    return () => window.removeEventListener('resize', updateSizeAndVisibility);
  }, []);


  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`p-4 flex flex-col gap-2 bg-white transition-opacity duration-200 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {/* Row */}
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <img
          src={toggle}
          alt="drag"
          className="w-6 h-2 mt-8 mr-5 opacity-70 cursor-grab hover:opacity-100 transition-opacity"
        />

        <div className="relative w-fit">
          <div
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 flex items-center justify-center text-white text-xs font-bold bg-purple-500"
            style={{
              width: "28px",
              height: "38px",
              clipPath:
                'path("M14,0 C6,0 0,6 0,14 C0,23 14,38 14,38 C14,38 28,23 28,14 C28,6 22,0 14,0 Z")',
              boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
              fontSize: "0.75rem",
              lineHeight: "38px",
              textAlign: "center",
            }}
          >
            {index + 1}
          </div>

   
 <img
 src={item.image}
 alt={item.name}
 width={size.width}
 height={size.height}
 className="rounded-lg shadow-sm"
/>


        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 ">

              <div className="flex justify-between items-start w-full">
                {/* Left Side: Name and Rating */}
                <div className="flex-1 pr-3">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {item.rating}
                    </span>
                    <img
                      src={star}
                      alt="rating"
                      className="w-3 h-3"
                    />
                    <span className="text-xs text-gray-500">
                      ({item.reviews.toLocaleString()})
                    </span>
                  </div>
                </div>

                {/* Right Side: Action Buttons */}
                <div className="flex gap-2 ml-2">
                  <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200">
                    <img
                      src={googlemapIcon}
                      alt="edit"
                      className="w-4 h-4"
                    />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200">
                    <img
                      src={paperpinIcon}
                      alt="pin"
                      className="w-4 h-4"
                    />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200">
                    <img
                      src={deleteIcon}
                      alt="delete"
                      className="w-4 h-4"
                    />
                  </button>
                </div>
              </div>

              {showBigScreenEdit && (
        <div
          id="big-screen-edit"
          className="flex items-center p-2 gap-2 text-sm text-gray-600 leading-snug rounded-lg w-full bg-gray-200 mr-5"
        >
          <p className="m-0 flex-1">{item.description}</p>
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <img src={editIcon} alt="edit" className="w-4 h-4" />
          </button>
        </div>
      )}


              
            </div>
            
          </div>
          
        </div>
        
      </div>

   
      {!showBigScreenEdit && (
  <div id="smalls-screen-edit" className="flex items-center p-2 gap-2 text-sm text-gray-600 leading-snug rounded-lg w-full bg-gray-200 mr-5">
    <p className="m-0 flex-1">{item.description}</p>
    <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200">
      <img src={editIcon} alt="edit" className="w-4 h-4" />
    </button>
  </div>
)}





      {/* Special Red Fort Action - Show for second item (index === 1) */}
      {index === 1 && (
        <div className="ml-11">
       <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">

  <div className="w-[150px] flex items-center gap-2 px-3 py-2 border border-blue-200 bg-blue-50 rounded">
    <div className="w-6 h-6 bg-white border border-blue-200 rounded flex items-center justify-center">
      <span className="text-xs font-bold text-blue-600">W</span>
    </div>
    <span className="font-medium text-blue-600">Credit...</span>
  </div>

  {/* Divider */}
  <span className="text-gray-400 mx-1">|</span>

  {/* Plus icon */}
  <div className="w-40 h-10 bg-gray-100 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-200">
    <button className="text-base font-light text-gray-500">+</button>
  </div>
</button>

        </div>
      )}
    </div>
  );
};

// Main component
const ItineraryCard = () => {
  const [maxHeight, setMaxHeight] = useState(window.innerHeight * 0.78);
  const [items, setItems] = useState(itineraryData);

  useEffect(() => {
    const handleResize = () => {
      setMaxHeight(window.innerHeight * 0.78);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const moveItem = useCallback((dragIndex, hoverIndex) => {
    setItems((prevItems) => {
      const draggedItem = prevItems[dragIndex];
      const newItems = [...prevItems];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, draggedItem);
      return newItems;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-3">
        <h2 className="ml-[55px] text-lg font-bold text-gray-800 mb-1">Itinerary</h2>
<p className="ml-[55px] text-sm font-bold text-gray-500">Day</p>

        </div>

        <div
          className="w-full overflow-x-auto"
          style={{
            maxHeight: `${maxHeight}px`,
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE 10+
          }}
        >
          {items.map((item, index) => (
            <DraggableItineraryItem
              key={item.id}
              item={item}
              index={index}
              moveItem={moveItem}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default ItineraryCard;