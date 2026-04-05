import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Set "mo:core/Set";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  // Access control setup
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Core types
  type StylePreference = {
    #indian;
    #western;
    #indoWestern;
  };

  type OccasionCategory = {
    #festive;
    #work;
    #casual;
    #formal;
    #special;
  };

  type Occasion = {
    category : OccasionCategory;
    subOccasion : Text;
  };

  // User profile types and logic
  type UserProfile = {
    skinTone : Text;
    bodyType : Text;
    stylePreference : StylePreference;
    outfits : Set.Set<Text>;
    accessories : Set.Set<Text>;
    jewellery : Set.Set<Text>;
    occasion : Occasion;
  };

  type EditableUserProfile = {
    skinTone : Text;
    bodyType : Text;
    stylePreference : StylePreference;
    outfits : [Text];
    accessories : [Text];
    jewellery : [Text];
    occasion : Occasion;
  };

  module UserProfile {
    public func compare(profile1 : UserProfile, profile2 : UserProfile) : Order.Order {
      Text.compare(profile1.skinTone, profile2.skinTone);
    };

    public func compareByBodyType(profile1 : UserProfile, profile2 : UserProfile) : Order.Order {
      Text.compare(profile1.bodyType, profile2.bodyType);
    };
  };

  // UserProfile storage and management
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Data conversions
  func toEditable(profile : UserProfile) : EditableUserProfile {
    {
      skinTone = profile.skinTone;
      bodyType = profile.bodyType;
      stylePreference = profile.stylePreference;
      outfits = profile.outfits.toArray();
      accessories = profile.accessories.toArray();
      jewellery = profile.jewellery.toArray();
      occasion = profile.occasion;
    };
  };

  func toDefaultUserProfile(editable : EditableUserProfile) : UserProfile {
    {
      skinTone = editable.skinTone;
      bodyType = editable.bodyType;
      stylePreference = editable.stylePreference;
      outfits = Set.fromArray<Text>(editable.outfits);
      accessories = Set.fromArray<Text>(editable.accessories);
      jewellery = Set.fromArray<Text>(editable.jewellery);
      occasion = editable.occasion;
    };
  };

  // User profile management queries and updates
  public query ({ caller }) func getCallerUserProfile() : async ?EditableUserProfile {
    userProfiles.get(caller).map(toEditable);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?EditableUserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user).map(toEditable);
  };

  public query ({ caller }) func getAllProfiles() : async [EditableUserProfile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all profiles");
    };
    userProfiles.values().toArray().sort().map(toEditable);
  };

  public query ({ caller }) func getAllProfilesByBodyTypes() : async [EditableUserProfile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all profiles");
    };
    userProfiles.values().toArray().sort(UserProfile.compareByBodyType).map(toEditable);
  };

  public shared ({ caller }) func upsertProfile(profile : EditableUserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, toDefaultUserProfile(profile));
  };

  // Additional types and basic implementation
  let subOccasions = Map.empty<Text, Text>();

  // Basic array to set of maps conversion
  func arrayToSet(array : [Text]) : Set.Set<Text> {
    Set.fromIter(array.values());
  };

  // Function to get all festive sub-occasions
  public query ({ caller }) func getAllFestiveSubOccasions() : async [Text] {
    subOccasions.toArray().map(func((name, _)) { name });
  };

  // Outfit recommendation types and basic logic
  type OutfitRecommendation = {
    outfitName : Text;
    description : Text;
    colorPalette : [Text];
    jewellery : [Text];
    styleTips : Text;
  };

  type EditableOutfitRecommendation = {
    outfitName : Text;
    description : Text;
    colorPalette : [Text];
    jewellery : [Text];
    styleTips : Text;
  };

  func recommendationToEditable(recommendation : OutfitRecommendation) : EditableOutfitRecommendation {
    recommendation;
  };

  // Core outfit recommendation logic (simplified)
  public query ({ caller }) func getCallerRecommendations() : async [EditableOutfitRecommendation] {
    switch (userProfiles.get(caller)) {
      case (null) { [] };
      case (?profile) {
        switch (profile.stylePreference) {
          case (#indian) {
            singletonRecommendation("Saree", "Traditional Indian saree with vibrant colors and intricate designs.", ["Red", "Gold", "Green"], ["Gold necklace", "Bangles"], "Pair with matching jewelry and sandals.");
          };
          case (#western) {
            singletonRecommendation("Business Casual", "Modern western outfit suitable for work environments.", ["Navy", "White", "Grey"], ["Wristwatch", "Stud earrings"], "Opt for layers and comfortable shoes.");
          };
          case (#indoWestern) {
            singletonRecommendation("Kurti with Jeans", "Fusion of Indian and western styles for casual outings.", ["Teal", "Beige", "Maroon"], ["Silver pendant", "Jhumkas"], "Mix with comfortable flats or sneakers.");
          };
        };
      };
    };
  };

  func singletonRecommendation(outfitName : Text, description : Text, colorPalette : [Text], jewellery : [Text], styleTips : Text) : [EditableOutfitRecommendation] {
    [
      {
        outfitName;
        description;
        colorPalette;
        jewellery;
        styleTips;
      },
    ];
  };

  // Search for occasion-specific recommendations
  public query ({ caller }) func getRecommendationsForOccasion(subOccasion : Text) : async [EditableOutfitRecommendation] {
    singletonRecommendation("Festive Attire", "Bright and celebratory outfit for festival occasions.", ["Yellow", "Orange", "Gold"], ["Polki necklace", "Bangles"], "Experiment with traditional prints and bold accessories.");
  };

  // Outfit and favorites management with transformation
  func favoriteToEditable(favorites : Set.Set<Text>) : [Text] {
    favorites.toArray();
  };

  func updateFavoritesFromEditable(existingFavorites : Set.Set<Text>, newFavorites : [Text]) : Set.Set<Text> {
    arrayToSet(newFavorites);
  };

  // Favorites functions
  public query ({ caller }) func getFavorites() : async [Text] {
    switch (userProfiles.get(caller)) {
      case (null) { [] };
      case (?profile) { favoriteToEditable(profile.outfits) };
    };
  };

  public shared ({ caller }) func setFavorites(newFavorites : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save favorites");
    };
    switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("User profile does not exist!") };
      case (?profile) {
        let updatedFavorites = updateFavoritesFromEditable(profile.outfits, newFavorites);
        userProfiles.add(caller, { profile with outfits = updatedFavorites });
      };
    };
  };

  // Outfits management
  public query ({ caller }) func getOutfits() : async [Text] {
    switch (userProfiles.get(caller)) {
      case (null) { [] };
      case (?profile) { favoriteToEditable(profile.outfits) };
    };
  };

  public shared ({ caller }) func setOutfits(newOutfits : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save outfits");
    };
    switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("User profile does not exist!") };
      case (?profile) {
        let updatedOutfits = updateFavoritesFromEditable(profile.outfits, newOutfits);
        userProfiles.add(caller, { profile with outfits = updatedOutfits });
      };
    };
  };

  // Accessories management
  public query ({ caller }) func getAccessories() : async [Text] {
    switch (userProfiles.get(caller)) {
      case (null) { [] };
      case (?profile) { favoriteToEditable(profile.accessories) };
    };
  };

  public shared ({ caller }) func setAccessories(newAccessories : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save accessories");
    };
    switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("User profile does not exist!") };
      case (?profile) {
        let updatedAccessories = updateFavoritesFromEditable(profile.accessories, newAccessories);
        userProfiles.add(caller, { profile with accessories = updatedAccessories });
      };
    };
  };

  // Jewelry management
  public query ({ caller }) func getJewellery() : async [Text] {
    switch (userProfiles.get(caller)) {
      case (null) { [] };
      case (?profile) { favoriteToEditable(profile.jewellery) };
    };
  };

  public shared ({ caller }) func setJewellery(newJewellery : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save jewellery");
    };
    switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("User profile does not exist!") };
      case (?profile) {
        let updatedJewellery = updateFavoritesFromEditable(profile.jewellery, newJewellery);
        userProfiles.add(caller, { profile with jewellery = updatedJewellery });
      };
    };
  };

  // Comprehensive profile update
  public shared ({ caller }) func updateProfile(profile : EditableUserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update profiles");
    };
    userProfiles.add(caller, toDefaultUserProfile(profile));
  };

  // Sub-occasion management logic
  public shared ({ caller }) func addSubOccasion(name : Text, category : OccasionCategory) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add sub-occasions");
    };
    subOccasions.add(name, toText(category));
  };

  // Helper to convert category to Text
  func toText(category : OccasionCategory) : Text {
    switch (category) {
      case (#festive) { "Festive" };
      case (#work) { "Work" };
      case (#casual) { "Casual" };
      case (#formal) { "Formal" };
      case (#special) { "Special" };
    };
  };
};
