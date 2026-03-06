import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CompanyContactDetails } from "../backend.d";
import { useActor } from "./useActor";

export function useSubmitContactForm() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitContactForm(name, email, message);
    },
  });
}

export function useContactDetails() {
  const { actor, isFetching } = useActor();
  return useQuery<CompanyContactDetails>({
    queryKey: ["contactDetails"],
    queryFn: async () => {
      if (!actor) {
        return {
          phoneNumber: "+91 98765 43210",
          emailAddress: "info@diivyapackaging.com",
          physicalAddress: "123 Industrial Area, Phase 2",
          googleMapsUrl: "https://maps.google.com/?q=Industrial+Area+India",
        };
      }
      return actor.getCompanyContactDetails();
    },
    enabled: !isFetching,
    placeholderData: {
      phoneNumber: "+91 98765 43210",
      emailAddress: "info@diivyapackaging.com",
      physicalAddress: "123 Industrial Area, Phase 2",
      googleMapsUrl: "https://maps.google.com/?q=Industrial+Area+India",
    },
  });
}

export function useUpdateContactDetails() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (details: CompanyContactDetails) => {
      if (!actor) throw new Error("Not connected");
      await actor.setCompanyContactDetails(
        details.phoneNumber,
        details.emailAddress,
        details.physicalAddress,
        details.googleMapsUrl,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contactDetails"] });
    },
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !isFetching,
  });
}
