import React from "react";
import { Card } from "antd";
import "./ItemCard.css";

function ItemCard({ title, price, description, img }) {
  return (
    <div className="ItemCard">
      <div className="ItemCardImg">
        <img src={`${import.meta.env.VITE__API_URL}/assets/${img}`} alt={img} className="ImgCard" />
      </div>
      <Card
        style={{
          width: 250,
          height: 75,
          marginLeft: -38,
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div className="ItemCardTitlePriceDescription">
          <div className="ItemCardTitlePrice">
            <p className="ItemCardTitle">{title}</p>
            <p className="ItemCardPrice">
              {price} {price && "CAD"}
            </p>
          </div>
          <div className="ItemCardDescription">{description}</div>
        </div>
      </Card>
    </div>
  );
}

export default ItemCard;
