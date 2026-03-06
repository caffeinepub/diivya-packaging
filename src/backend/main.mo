import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  type ContactFormEntry = {
    name : Text;
    email : Text;
    message : Text;
  };

  let contactFormEntries = Map.empty<Text, ContactFormEntry>();

  // Authorization system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Contact form submission - accessible to anyone (no auth check)
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    if (contactFormEntries.containsKey(email)) { Runtime.trap("There is already an inquiry with this email.") };
    let contactFormEntry : ContactFormEntry = {
      name;
      email;
      message;
    };
    contactFormEntries.add(email, contactFormEntry);
  };

  // View all contact form entries - admin only
  public query ({ caller }) func getAllContactFormEntries() : async [ContactFormEntry] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all contact form entries.");
    };
    contactFormEntries.values().toArray();
  };

  public type CompanyContactDetails = {
    phoneNumber : Text;
    emailAddress : Text;
    physicalAddress : Text;
    googleMapsUrl : Text;
  };

  var contactDetails : ?CompanyContactDetails = null;

  // Anyone can read the contact details, returns defaults if not set
  public query ({ caller }) func getCompanyContactDetails() : async CompanyContactDetails {
    switch (contactDetails) {
      case (null) {
        {
          phoneNumber = "<dummy phone number>";
          emailAddress = "<dummy email address>";
          physicalAddress = "<dummy physical address>";
          googleMapsUrl = "<dummy Google Maps URL>";
        };
      };
      case (?details) { details };
    };
  };

  // Only admin can update details
  public shared ({ caller }) func setCompanyContactDetails(
    phoneNumber : Text,
    emailAddress : Text,
    physicalAddress : Text,
    googleMapsUrl : Text,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update contact details.");
    };

    let newDetails : CompanyContactDetails = {
      phoneNumber;
      emailAddress;
      physicalAddress;
      googleMapsUrl;
    };

    contactDetails := ?newDetails;
  };
};
