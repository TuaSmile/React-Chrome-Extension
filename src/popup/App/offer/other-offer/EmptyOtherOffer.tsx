const EmptyOtherOffer = () => {
  return (
    <div className="mt-4 flex flex-col gap-2 text-center text-sm">
      <p>Sorry, there are no offers available for this site 😔</p>

      <p>Think we should add exclusive offers for this site?</p>

      <p
        className="cursor-pointer underline"
        onClick={() =>
          window.open("https://form.typeform.com/to/Al1pUkj6", "_blank")
        }
      >
        Let us know
      </p>
    </div>
  );
};

export default EmptyOtherOffer;
