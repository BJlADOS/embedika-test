import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Format, IMediaDetailResponse } from 'src/app/interfaces/media';
import { IFilter, IVariables } from 'src/app/interfaces/filters';
import { GET_MEDIA, GET_MEDIA_BY_ID } from 'src/app/qraphql/graphql.queries';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private _apollo: Apollo,
  ) { }

  public getMediaWatchQuery(page: number, perPage: number, filters: IFilter): QueryRef<any, any> {
    return this._apollo.watchQuery({
      query: GET_MEDIA,
      variables: this.createVariblesObject(page, perPage, filters),
    });
  }

  public getMediaById(id: string): Observable<ApolloQueryResult<IMediaDetailResponse>> {
    return this._apollo.query<IMediaDetailResponse>({
      query: GET_MEDIA_BY_ID,
      variables: { mediaId: id },
    });
  }

  public refetchMediaQuery(query: QueryRef<any, any>, page: number, perPage: number, filters: IFilter): void {
    query.setVariables(this.createVariblesObject(page, perPage, filters));
    query.refetch();
  }

  public updateFilters(filters: IFilter, params: any): void {
    filters.search = (params['search'] === '' ? null : params['search']) || null;
    filters.statusIn = params['statusIn'] || null;
    filters.format = params['format'] || Format.TV;
  }

  private createVariblesObject(page: number, perPage: number, filters: IFilter): IVariables {
    const variables: any = { page: page, perPage: perPage };
    Object.values(filters).map((value, index) => {
      if (value) {
        variables[Object.keys(filters)[index]] = value.length ? value : undefined;
      }
    }
    );
    return variables;
  }
}
