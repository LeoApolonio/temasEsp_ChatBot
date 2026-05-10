function Card({ title, description, children }) {

  return (

    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">

      <h2 className="text-xl font-semibold mb-2">
        {title}
      </h2>

      <p className="text-gray-400 mb-4">
        {description}
      </p>

      {children}

    </div>

  );

}

export default Card;