const TextDocument = (props: any) => (
    <svg
      width="1rem"
      height="1rem"
      viewBox="0 0 2048 2048"
      focusable={false}
      {...props}
    >
      <path
        d="M1243 0l549 549v1499H128V0h1115zm37 219v293h293l-293-293zM256 1920h1408V640h-512V128H256v1792zm256-896V896h896v128H512zm0 256v-128h896v128H512zm0 256v-128h896v128H512z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
  
  export default TextDocument;
  