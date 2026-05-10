function SectionTitle({ title, subtitle }) {

  return (

    <div className="mb-8">

      <h1 className="text-4xl font-bold mb-2">
        {title}
      </h1>

      <p className="text-gray-400">
        {subtitle}
      </p>

    </div>

  );

}

export default SectionTitle;