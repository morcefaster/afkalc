import { GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import withLayoutPrivate from "../../components/layout/withLayoutPrivate";
import useDescription from "../../components/pages/TopTeam/hooks/useDescription";
import useTitle from "../../components/pages/TopTeam/hooks/useTitle";
import Board from "../../components/pages/TopTeam/ui/Board";
import EnemiPosition from "../../components/pages/TopTeam/ui/EnemiPosition";
import PlayerPosition from "../../components/pages/TopTeam/ui/PlayerPosition";
import ShareBanner from "../../components/pages/TopTeam/ui/ShareBanner";
import { DetailType } from "../../components/ui/afk/Character";
import Card from "../../components/ui/card/Card";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "top-team"])),
  },
});

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [],
  fallback: "blocking",
});

interface Props {
  [key: string]: never;
}

const TopTeam: React.FC<Props> = function TopTeam() {
  const router = useRouter();
  const { id } = router.query;

  const [heroes = "", si = "", fi = "", artifact = ""] = decodeURIComponent(id as string).split(
    "-"
  );
  const [t1, t2, t3, t4, t5, t6] = heroes
    .split("")
    .map((e) => e.charCodeAt(0))
    .map((e) => +e - 48);

  const [s1, s2, s3, s4, s5] = si
    .split("")
    .map((e) => e.charCodeAt(0))
    .map((e) => +e - 48);

  const [i1, i2, i3, i4, i5] = fi
    .split("")
    .map((e) => e.charCodeAt(0))
    .map((e) => +e - 48);

  const [a1, a2, a3, a4, a5] = artifact
    .split("")
    .map((e) => e.charCodeAt(0))
    .map((e) => +e - 48);

  const [team, setTeam] = useState({ 1: t1, 2: t2, 3: t3, 4: t4, 5: t5, 6: t6 });
  const [siList, setSiList] = useState({ 1: s1, 2: s2, 3: s3, 4: s4, 5: s5 });
  const [fiList, setFiList] = useState({ 1: i1, 2: i2, 3: i3, 4: i4, 5: i5 });
  const [artifactList, setArtifactList] = useState({ 1: a1, 2: a2, 3: a3, 4: a4, 5: a5 });

  const onSelect = useCallback(
    (type: DetailType, position: number) => (value: number) => {
      if (type === DetailType.HERO) setTeam({ ...team, [position]: value });
      if (type === DetailType.SI) setSiList({ ...siList, [position]: value });
      if (type === DetailType.INN) setFiList({ ...fiList, [position]: value });
      if (type === DetailType.ARTIFACT) setArtifactList({ ...artifactList, [position]: value });
    },
    [artifactList, fiList, siList, team]
  );

  const title = useTitle(team[6]);
  const description = useDescription(team, siList, fiList, artifactList);

  return (
    <Card>
      <Head>
        <title>{`${title} - Afkalc`}</title>
        <meta name="description" content={description} />
      </Head>
      <Board>
        <ShareBanner team={team} si={siList} fi={fiList} artifact={artifactList} />
        <PlayerPosition
          onSelect={onSelect}
          position={1}
          hero={team[1]}
          si={siList[1]}
          fi={fiList[1]}
          artifact={artifactList[1]}
        />
        <PlayerPosition
          onSelect={onSelect}
          position={2}
          hero={team[2]}
          si={siList[2]}
          fi={fiList[2]}
          artifact={artifactList[2]}
        />
        <PlayerPosition
          onSelect={onSelect}
          position={3}
          hero={team[3]}
          si={siList[3]}
          fi={fiList[3]}
          artifact={artifactList[3]}
        />
        <PlayerPosition
          onSelect={onSelect}
          position={4}
          hero={team[4]}
          si={siList[4]}
          fi={fiList[4]}
          artifact={artifactList[4]}
        />
        <PlayerPosition
          onSelect={onSelect}
          position={5}
          hero={team[5]}
          si={siList[5]}
          fi={fiList[5]}
          artifact={artifactList[5]}
        />
        <EnemiPosition onSelect={onSelect} position={6} enemi={team[6]} />
      </Board>
    </Card>
  );
};

export default withLayoutPrivate(TopTeam);
