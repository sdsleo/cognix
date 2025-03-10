const CheckList = (props: any) => (
    <svg
      width="1rem"
      height="1rem"
      viewBox="0 0 2048 2048"
      focusable={false}
      {...props}
    >
      <path
        d="M640 896V768h1408v128H640zm0-512h1408v128H640V384zm0 896v-128h1408v128H640zm0 384v-128h1408v128H640zM192 469l211-210 90 90-301 301L19 477l90-90 83 82zm0 384l211-210 90 90-301 301L19 861l90-90 83 82zm0 384l211-210 90 90-301 301-173-173 90-90 83 82zm0 384l211-210 90 90-301 301-173-173 90-90 83 82z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
  
  export default CheckList;