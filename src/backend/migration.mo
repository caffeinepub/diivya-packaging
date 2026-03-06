import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

module {
  type OldActor = {
    contactFormEntries : Map.Map<Text, { name : Text; email : Text; message : Text }>;
  };

  // New actor type has additional fields
  type NewActor = {
    contactFormEntries : Map.Map<Text, { name : Text; email : Text; message : Text }>;
    contactDetails : ?{
      phoneNumber : Text;
      emailAddress : Text;
      physicalAddress : Text;
      googleMapsUrl : Text;
    };
    userProfiles : Map.Map<Principal, { name : Text }>;
  };

  public func run(old : OldActor) : NewActor {
    {
      contactFormEntries = old.contactFormEntries;
      contactDetails = null;
      userProfiles = Map.empty<Principal, { name : Text }>();
    };
  };
};
