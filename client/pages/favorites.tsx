import Meta from "@/src/components/meta";
import Catalog from "@/src/components/ui/catalog";
import Layout from "@/src/components/ui/layout";
import { useProfile } from "@/src/hooks/useProfile";
import { NextPageAuth } from "@/src/providers/auth-provider/auth-page.types";
import { FC } from "react";

const Favorites: NextPageAuth = ({}) => {
  const { profile } = useProfile();
  return (
    <Meta title="Favorites">
      <Layout>
        <Catalog
          title="Favorites"
          data={{
            products: profile?.favorites || [],
            length: profile?.favorites.length || 0,
          }}
        />
      </Layout>
    </Meta>
  );
};

Favorites.isOnlyUser = true;

export default Favorites;
