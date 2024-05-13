import React from 'react';

const HomePage = () => {
  return (
    <div>
      <header className="bg-gray-800 p-4 text-white text-center">
        <h1 className="text-3xl font-bold">Bienvenue à la Boulangerie Le Bon Pain</h1>
        <p className="mt-2">Découvrez notre sélection de pains frais et de délicieuses pâtisseries artisanales</p>
      </header>
      <main className="container mx-auto py-8">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Notre gamme de pains</h2>
            <p>Du pain de campagne traditionnel aux baguettes croustillantes, nous avons une variété de pains pour tous les goûts.</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Nos pâtisseries artisanales</h2>
            <p>Laissez-vous tenter par nos croissants dorés, nos éclairs au chocolat et nos tartes aux fruits frais.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;