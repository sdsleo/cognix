const Separator = (props: any) => (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 2048 2048"
    focusable={false}
    {...props}
  >
    <path
      d="M1024 128v1792H896V128h128z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default Separator;
