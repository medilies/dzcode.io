import { Controller, Get, QueryParam } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { GithubService } from "src/github/service";
import { GithubUserDto } from "src/github-user/types";
import { Service } from "typedi";

import { GetContributorsResponseDto } from "./types";

@Service()
@Controller("/Contributors")
export class ContributorController {
  constructor(private readonly githubService: GithubService) {}

  @Get("/")
  @OpenAPI({
    summary: "Return a list of github users that contributed to data/[path] directory",
  })
  @ResponseSchema(GetContributorsResponseDto)
  public async getContributor(
    @QueryParam("path") path: string,
  ): Promise<GetContributorsResponseDto> {
    const responses = await Promise.all([
      // current place for data:
      this.githubService.listContributors({
        owner: "dzcode-io",
        repo: "dzcode.io",
        path: `data/models/${path}`,
      }),
      // also check old place for data, to not lose contribution effort:
      this.githubService.listContributors({
        owner: "dzcode-io",
        repo: "dzcode.io",
        path: `data/${path}`,
      }),
    ]);

    // filter and sort contributors:
    const uniqUsernames: Record<string, number> = {};
    const contributors = [...responses[0], ...responses[1]]
      .reduce<GithubUserDto[]>((pV, cV) => {
        if (uniqUsernames[cV.login]) {
          uniqUsernames[cV.login]++;
          return pV;
        } else {
          uniqUsernames[cV.login] = 1;
          return [...pV, cV];
        }
      }, [])
      .sort((a, b) => uniqUsernames[b.login] - uniqUsernames[a.login]);

    return {
      contributors,
    };
  }
}
