const FixedAssetManagement = (props: any) => (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 2048 2048"
    focusable={false}
    {...props}
  >
    <path
      d="M1792 1280h256v768H1024v-768h256v-256h512v256zm-384-128v128h256v-128h-256zm512 768v-256h-128v128h-128v-128h-256v128h-128v-128h-128v256h768zm0-384v-128h-768v128h768zm-768-512v128H896v256H640v-128h128v-128H512v256H0V640h128V128h1536v768h-128V256H256v384h256v384h640zm-768 256V768H128v512h256z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default FixedAssetManagement;
