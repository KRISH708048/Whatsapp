import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <div className="p-4">
      <form className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered rounded-full"
        />
        <button type="submit" className="btn btn-circle bg-gray-400 bg-clip-padding  bg-opacity-20 text-white">
          {/* <IoSearchSharp className='w-6 h-6 outline-none' /> */}<SearchIcon fontSize='medium'/>
        </button>
      </form>
    </div>
  );
};
export default SearchBar;
