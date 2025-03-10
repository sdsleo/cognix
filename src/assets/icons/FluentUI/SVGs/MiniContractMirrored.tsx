const MiniContractMirrored = (props: any) => (
    <svg
      width="1rem"
      height="1rem"
      viewBox="0 0 2048 2048"
      focusable={false}
      {...props}
    >
      <path
        d="M256 1280H128v512h1792V256h-768v128h640v768h-768v512H256v-384zm1536 0v384h-640v-384h640zM256 1024h640V384H768v421L219 256l-91 91 549 549H256v128z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
  
  export default MiniContractMirrored;