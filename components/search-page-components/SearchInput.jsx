
function SearchInput({ value, onChange, onSubmit, setSearch, t }) {

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
    setSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <input
        id="input"
        type="text"
        placeholder={`${t("button")}....`}
        value={value}
        onChange={handleChange}
        className="font-medium rounded-lg pl-2 pr-8 py-1.5 mr-2 mb-2 border border-gray-300 dark:bg-bodyWhite dark:text-lightBlack"
      />
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-4 md:px-5 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        {t("button")}
      </button>
    </form>
  );
}

export default SearchInput;
