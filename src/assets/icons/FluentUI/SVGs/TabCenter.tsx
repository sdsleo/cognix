const TabCenter = (props: any) => (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 2048 2048"
    focusable={false}
    {...props}
  >
    <path
      d="M1920 640v1280H512v-512H128V128h1408v512h384zm-128 1152v-768H640v768h1152zM512 1280V640h896V512H256v768h256zM256 256v128h1152V256H256zm1536 512H640v128h1152V768z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default TabCenter;
