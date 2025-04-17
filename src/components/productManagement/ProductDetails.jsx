import React from "react";
import {
  Modal,
  Descriptions,
  Carousel,
  Image,
  Divider,
  Tag,
  Typography,
} from "antd";

const { Title, Paragraph } = Typography;

const ProductDetailModal = ({ visible, onCancel, product }) => {
  if (!product) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Modal
      title={<Title level={4}>{product.name}</Title>}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={1100}
    >
      <div className="product-detail-content ">
        {/* Product Images */}
        {product.images && product.images.length > 0 && (
          <div className="product-images space-y-4 mb-5">
            {/* First image - full width */}
            <div style={{ textAlign: "center" }}>
              <Image
                src={product.images[0]}
                alt={`${product.name} - Image 1`}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "120px",
                  objectFit: "contain",
                }}
                className="rounded-lg"
              />
            </div>

            {/* Rest of the images - small and flex */}
            {product.images.length > 1 && (
              <div className="flex flex-wrap justify-center gap-4">
                {product.images.slice(1).map((image, index) => (
                  <Image
                    key={index + 1}
                    src={image}
                    alt={`${product.name} - Image ${index + 2}`}
                    style={{
                      width: "60px",
                      height: "auto",
                      maxHeight: "70px",
                      objectFit: "contain",
                    }}
                    // preview={{
                    //   imageRender: (originalNode, info) => {
                    //     return (
                    //       <div style={{ textAlign: "center" }}>
                    //         <img
                    //           src={info.src}
                    //           alt="preview"
                    //           style={{ maxWidth: "1000px", maxHeight: "800px" }} 
                    //         />
                    //       </div>
                    //     );
                    //   },
                    // }}
                    className="rounded-md"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Product Information */}
        <Descriptions
          bordered
          column={1}
          size="small"
          style={{ marginBottom: 0 }}
        >
          <Descriptions.Item label="Category">
            {product.category}
          </Descriptions.Item>

          <Descriptions.Item label="Sub Category">
            {product.subCategory}
          </Descriptions.Item>

          <Descriptions.Item label="Price">
            <span
              style={{ color: "#f50", fontWeight: "bold", fontSize: "16px" }}
            >
              $ {product.price.toLocaleString()}
            </span>
          </Descriptions.Item>

          <Descriptions.Item label="Quantity">
            {product.quantity} in stock
          </Descriptions.Item>

          <Descriptions.Item label="Quality">
            {product.quality}
          </Descriptions.Item>

          {product.createdAt && (
            <Descriptions.Item label="Created Date">
              {formatDate(product.createdAt)}
            </Descriptions.Item>
          )}

          {product.updatedAt && (
            <Descriptions.Item label="Last Updated">
              {formatDate(product.updatedAt)}
            </Descriptions.Item>
          )}
        </Descriptions>

        <Divider orientation="left">Description</Divider>

        <Paragraph>{product.description}</Paragraph>

        {/* Additional properties if any
        {product.additionalProperties &&
          Object.keys(product.additionalProperties).length > 0 && (
            <>
              <Divider orientation="left">Additional Information</Divider>
              <Descriptions bordered column={1}>
                {Object.entries(product.additionalProperties).map(
                  ([key, value]) => (
                    <Descriptions.Item key={key} label={key}>
                      {value}
                    </Descriptions.Item>
                  )
                )}
              </Descriptions>
            </>
          )} */}
      </div>
    </Modal>
  );
};

export default ProductDetailModal;
