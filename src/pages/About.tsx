import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ImageModal from '../components/ui/ImageModal';

const galleryImages = [
  '/images/gallery/0e5a5141-cb75-4e7c-9c20-b847dd733f84.JPG',
  '/images/gallery/3a740fe1-074c-4129-9091-fb6e14ee9903.JPG',
  '/images/gallery/5b9ccea3-28e3-49ac-86e8-0bcfc9b56a88.JPG',
  '/images/gallery/5e07b9f4-7658-4969-b59e-f2475595b401.JPG',
  '/images/gallery/5f4ce5d8-6214-4968-b5c4-3359a02f2afb.JPG',
  '/images/gallery/5f159954-bb0b-4888-af44-5793fceb22d4.JPG',

  '/images/gallery/6b3341bb-e438-43b8-869c-2889c42ab34c.JPG',
  '/images/gallery/8a246765-9778-4a41-8221-ccd5fb9c4fd2.JPG',
  '/images/gallery/9a3ee66a-1637-4f91-95fc-78dc11d1ea44.JPG',
  '/images/gallery/34b83fcc-8062-4103-b965-c9a8896970a0.JPG',
  '/images/gallery/50b647c5-b58f-46e0-807a-29cb6ef5f8c7 2.JPG',
  '/images/gallery/72dbab8b-33b8-4615-a7d7-70a4e49b4613.JPG',

  '/images/gallery/138d9b38-877f-493e-a1b0-97b02fc8b81c.JPG',
  '/images/gallery/919a3ec8-f8f5-4744-8d67-bc5793294fde.JPG',
  '/images/gallery/929f08d4-e6e8-4bec-bd1c-31e3b17cfba5.JPG',
  '/images/gallery/988a65fe-a690-4d29-9114-c16c1275f5bb.JPG',
  '/images/gallery/7738c9e5-dda7-4a32-92de-efa565592f21.JPG',
  '/images/gallery/92141719-a27f-4f70-bcde-27070a4c851f.JPG',

  '/images/gallery/94709559-8077-4bf4-9fac-e957f6cd0d08.JPG',
  '/images/gallery/a86760b1-7a21-41d5-b08f-0f3ece40ecb3.JPG',
  '/images/gallery/af43069d-2c16-4da1-8e95-c45d848c625e.JPG',
  '/images/gallery/b03a3092-438c-493a-a16e-6e7558ac3aa0.JPG',
  '/images/gallery/b69fd32b-f9d0-4fc8-b8aa-9574d7ee70cd.JPG',
  '/images/gallery/b9015590-1dbe-40d6-8b8d-3158e806654a.JPG',

  '/images/gallery/be05440c-ed87-4a26-9aa6-af948d7a773c.JPG',
  '/images/gallery/cc91f482-6ddb-4854-b5d2-c4d703558e61.JPG',
  '/images/gallery/cd492797-4f98-48e5-af09-3bfd4913350b.JPG',
  '/images/gallery/ce0ab8ec-5dbd-49ad-8c19-1534d54d4c9f.JPG',
  '/images/gallery/d2f639ed-507d-4549-9282-08ea3eafb167.JPG',
  '/images/gallery/d9dfa4b4-5f35-4736-9dcc-3d68682429cc.JPG',

  '/images/gallery/d019a043-37dc-41ea-83c1-bd9bd50cbea2.JPG',
  '/images/gallery/dd2e1238-7224-4bd9-b492-4ef2aa320ae3.JPG',
  '/images/gallery/e693d196-3668-472f-baf5-b09b2ca5ba5c.JPG',
  '/images/gallery/ee6f0bd6-a50b-40e9-84d4-c7979962243c.JPG',
  '/images/gallery/f144e2aa-cdcb-4c92-8a82-daa9a298ee45.JPG',
  '/images/gallery/fda8cb82-a1a4-4606-bd08-986a32e978d7.JPG',
];

const AboutUsPage: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
  
    const openModal = (index: number) => {
      setSelectedImage(galleryImages[index]);
      setCurrentIndex(index);
    };
  
    const closeModal = () => {
      setSelectedImage(null);
    };
  
    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
      setSelectedImage(galleryImages[(currentIndex + 1) % galleryImages.length]);
    };
  
    const prevImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
      setSelectedImage(galleryImages[(currentIndex - 1 + galleryImages.length) % galleryImages.length]);
    };
  
    return (
      <div className="container mx-auto px-4 py-16 relative">
        <div className="mb-12">
          <img
            src="/images/about-us-banner.jpg"
            alt="About Us Banner"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
  
        <h1 className="text-4xl font-bold text-center mb-12">About Cakes4U</h1>
  
        <div className="max-w-3xl mx-auto mb-16">
      
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Welcome to Cakes4U, where passion meets confection! Since 2010, we've been crafting delightful cakes and treats that bring joy to every celebration. Our team of skilled bakers and decorators pour their hearts into every creation, ensuring that each cake is not just a dessert, but a centerpiece of your special moments.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          At Cakes4U, we believe in using only the finest ingredients, blending traditional recipes with innovative designs to create cakes that are as beautiful as they are delicious. Whether you're celebrating a wedding, birthday, or any milestone, we're here to make your occasion truly unforgettable with our sweet creations.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          From our kitchen to your table, every Cakes4U creation is baked with love and decorated with care. We invite you to explore our gallery and taste the difference that passion and quality ingredients can make.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-center mb-8">Our Creations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onClick={() => openModal(index)}
          >
            <img
              src={image}
              alt={`Cake ${index + 1}`}
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
            />
          </motion.div>
        ))}
      </div>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={closeModal}
        imageSrc={selectedImage || ''}
        onNext={nextImage}
        onPrev={prevImage}
        currentIndex={currentIndex}
        totalImages={galleryImages.length}
      />
    </div>
  );
};

export default AboutUsPage;

