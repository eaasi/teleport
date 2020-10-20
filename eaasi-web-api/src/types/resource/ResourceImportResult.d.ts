import { UserImportedContent, UserImportedEnvironment, UserImportedSoftware } from '@/data_access/models/app';
import { UserImportedImage } from '@/data_access/models/app/UserImportedImage';
import ICrudServiceResult from '@/services/interfaces/ICrudServiceResult';

export default interface IResourceImportResult {
	userId: number;
	userImportedEnvironments: ICrudServiceResult<UserImportedEnvironment[]>;
	userImportedSoftware: ICrudServiceResult<UserImportedSoftware[]>;
	userImportedContent: ICrudServiceResult<UserImportedContent[]>;
	userImportedImage: ICrudServiceResult<UserImportedImage[]>;
}

export interface IUserImportResponse {
	importedContent: ICrudServiceResult<UserImportedEnvironment[]>;
	importedSoftware: ICrudServiceResult<UserImportedSoftware[]>;
	importedEnvironments: ICrudServiceResult<UserImportedContent[]>;
	importedImages: ICrudServiceResult<UserImportedImage[]>;
}